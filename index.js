// TODO!!! Maybe place this somewhere more organized..?
if (!('toJSON' in Error.prototype))
{
  Object.defineProperty(Error.prototype, 'toJSON', 
  {
    value: function () 
    {
      let alt = {}
      Object.getOwnPropertyNames(this).forEach((key) => { alt[key] = this[key] }, this)
      return alt
    },
    configurable  : true,
    writable      : true
  })
}

const
  fs      = require('fs'),
  Console = require('@superhero/debug'),
  console = new Console({ maxArrayLength:100 })

class Core
{
  constructor(locator, branch)
  {
    this.locator    = locator
    this.branch     = branch
    this.components = {}
  }

  add(component, pathname)
  {
    this.components[component] = pathname
  }

  remove(component)
  {
    delete this.components[component]
  }

  load(verbose = false)
  {
    try
    {
      if(this.branch)
      {
        console.color('blue').log('Branch defined')
        console.color('blue').log('')
        console.color('blue').log(`✔ ${this.branch}`)
        console.color('blue').log('')
      }
      else
      {
        console.color('yellow').log('Branch missing')
        console.color('yellow').log('')
        console.color('yellow').log(`✗ No branch is defined`)
        console.color('yellow').log('')
      }

      console.color('blue').log('Building configuration')
      console.color('blue').log('')

      this.buildConfiguration()

      const
        configuration         = this.locate('core/configuration'),
        serviceMapUncomposed  = configuration.find('core.locator'),
        serviceMap            = this.composeServiceMap(serviceMapUncomposed)
  
      configuration.freeze()

      try
      {
        console.color('blue').log('')
        console.color('blue').log('Loading services')
        console.color('blue').log('')

        // eager loading the services in the sevice locator
        this.loadServiceRecursion(serviceMap, verbose)
      }
      catch(previousError)
      {
        const error = new Error('runtime error in the eager loading process')
        error.code  = 'E_CORE_LOAD'
        error.chain = { configuration, serviceMap, previousError }
        throw error
      }
    }
    catch(completeError)
    {
      console.error('')
      console.error('Core error')
      console.error('')
      if(verbose)
      {
        console.error(completeError)
      }
      else
      {
        let error = completeError
        do
        {
          console.error(`✗ ${error.message}`)
          console.error(`  ${error.code}`)
          error.stack.split('\n').forEach((stack) => console.error(`  ↪ ${stack.trim()}`))
          if(error.chain && error.code !== 'E_CORE_LOAD')
          {
            console.error(`  CHAIN`)
            for(const key in error.chain)
            {
              if(key !== 'previousError')
              {
                console.error(`  ↪ ${key}:`, error.chain[key])
              }
            }
          }
          switch(error.code)
          {
            case 'E_SERVICE_UNABLE_TO_RESOLVE_DEPENDENCIES':
            {
              console.error(`Service map`)
              console.log(error.chain.serviceMap)
              console.error(`Error log`)
              console.log(error.chain.log)
              break
            }
          }
          console.error('')
        }
        while(error = error.chain && error.chain.previousError)
        console.color('yellow').log('Call core.load(true) for a more verbose error output')
      }
      throw new Error('core load process failed')
    }
    console.color('blue').log('')
    console.color('blue').log('Core Loaded')
    console.color('blue').log('')
  }

  extendConfigByComponent(component, path, branch)
  {
    const 
      configuration = this.locate('core/configuration'),
      config        = this.fetchComponentConfig(component, path, branch)

    for(const dependentComponent in config.core?.dependency || {})
    {
      if(dependentComponent in this.components)
      {
        console.color('yellow').log(`- ${dependentComponent} component loaded multiple times`)
        continue
      }

      const dependentPath = config.core?.dependency[dependentComponent]

      this.add(dependentComponent, dependentPath)
      this.extendConfigByComponent(dependentComponent, dependentPath)

      if(this.branch)
      {
        try
        {
          this.extendConfigByComponent(dependentComponent, dependentPath, this.branch)
        }
        catch(error)
        {
          // ... we don't need to do anything if the configuration doesn't exist,
          // or maybe emit a warning or info log message through the eventbus ...
        }
      }
    }

    if(!component.startsWith('core'))
    {
      branch
      ? console.color('blue').log(`✔ ${component} - ${branch}`)
      : console.color('blue').log(`✔ ${component}`)
    }

    configuration.extend(config)
  }

  buildConfiguration()
  {
    // extending the configurations of every component
    for(const component in this.components)
    {
      this.extendConfigByComponent(component, this.components[component])

      // extending the configurations of every component for a specific branch
      if(this.branch)
      {
        try
        {
          this.extendConfigByComponent(component, this.components[component], this.branch)
        }
        catch(error)
        {
          // ... we don't need to do anything if the configuration doesn't exist,
          // or maybe emit a warning or info log message through the eventbus ...
        }
      }
    }
  }

  /**
   * The ability to include by asterix is solved by this method
   */
  composeServiceMap(serviceMapUncomposed)
  {
    const serviceMap = {}

    for(const serviceNameUncomposed in serviceMapUncomposed)
    {
      if(serviceNameUncomposed.endsWith('*'))
      {
        const
        directoryPath = serviceMapUncomposed[serviceNameUncomposed].slice(0, -1),
        dirents       = fs.readdirSync(directoryPath, { withFileTypes:true })

        for(const dirent of dirents)
        {
          if(dirent.isDirectory())
          {
            const serviceNamePath = serviceNameUncomposed.slice(0, -1)
            serviceMap[serviceNamePath + dirent.name] = directoryPath + dirent.name
          }
        }
      }
      else
      {
        serviceMap[serviceNameUncomposed] = serviceMapUncomposed[serviceNameUncomposed]
      }
    }

    return serviceMap
  }

  fetchComponentConfig(component, pathname, branch)
  {
    const
    configFile    = branch ? `config-${branch}` : 'config',
    path          = this.locate('core/path'),
    specifiedPath = `${pathname}/${configFile}`,
    localPath     = `${path.main.dirname}/${component}/${configFile}`,
    absolutePath  = `${component}/${configFile}`,
    corePath      = `${__dirname}/${component}/${configFile}`

    if(path.isResolvable(specifiedPath))
      return require(specifiedPath)

    else if(path.isResolvable(localPath))
      return require(localPath)

    else if(path.isResolvable(absolutePath))
      return require(absolutePath)

    else if(path.isResolvable(corePath))
      return require(corePath)

    else
    {
      const
      msg   = `could not resolve path to component "${component}"`,
      error = new Error(msg)

      error.code  = 'E_COMPONENT_NOT_RESOLVABLE'
      error.chain = { component, pathname, branch, configFile, specifiedPath, 
                      localPath, absolutePath, corePath }

      throw error
    }
  }

  loadService(serviceName, servicePath)
  {
    const
    path        = this.locator.locate('core/path'),
    locatorPath = `${servicePath}/locator`

    if(path.isResolvable(locatorPath))
    {
      let locator

      try
      {
        const Locator = require(locatorPath)
        locator = new Locator(this.locator)
      }
      catch(previousError)
      {
        const
        msg   = `Problem on initiation of the locator: "${locatorPath}" with the error message: "${previousError.message}"`,
        error = new Error(msg)

        error.code  = 'E_CORE_LOAD_SERVICE'
        error.chain = { previousError, serviceName, servicePath, locatorPath }

        throw error
      }

      try
      {
        const service = locator.locate()
        this.locator.set(serviceName, service)
      }
      catch(previousError)
      {
        switch(previousError.code)
        {
          case 'E_SERVICE_UNDEFINED':
          {
            const
            msg    = `An unmet dependency was found for service "${serviceName}", error: ${previousError.message}`,
            error  = new Error(msg)

            error.code  = 'E_SERVICE_UNMET_DEPENDENCY'
            error.chain = { previousError, serviceName, servicePath, locatorPath }

            throw error
          }

          default:
            throw previousError
        }
      }
    }
    else
    {
      const
      msg   = `locator could not be found for ${serviceName}`,
      error = new Error(msg)

      error.code  = 'E_SERVICE_LOCATOR_NOT_FOUND'
      error.chain = { serviceName, servicePath }

      throw error
    }
  }

  /**
   * Eager loading the services in the sevice locator.
   * Recursion queue to complete loading all services.
   * @param {Object} serviceMap [names of services] => [filepath of services]
   */
  loadServiceRecursion(serviceMap, verbose, queueLog = [])
  {
    const keys = Object.keys(serviceMap)

    // when the queue is empty, then we are done
    if(keys.length === 0)
      return

    // incomplete services that could not be loaded in the declared order
    const queue = {}

    // looping through different service names in an attempt to eager load them
    // if an "unmet dependency" error is thrown, the service name is pushed to a queue to be located at a later stage
    // in hope that the earlier unmet dependency then is locatable
    for(const serviceName in serviceMap)
    {
      try
      {
        this.loadService(serviceName, serviceMap[serviceName])

        queueLog.push({ message:'✔ successfully loaded service', serviceName })

        if(!serviceName.startsWith('core'))
        {
          console.color('blue').log(`✔ ${serviceName}`)
        }
      }
      catch(error)
      {
        switch (error.code)
        {
          case 'E_SERVICE_UNMET_DEPENDENCY':
          {
            queue[serviceName] = serviceMap[serviceName]
            queueLog.push({ message:error.message, serviceName })
            break;
          }
          default:
          {
            throw error
          }
        }
      }
    }

    const queueKeys = Object.keys(queue)

    // if the new queue is the same as the old queue, then no progress has taken place
    if(keys.length === queueKeys.length)
    {
      queueKeys.forEach((serviceName) => console.color('red').error(`✘ ${serviceName}`))

      const 
      // filtereing off a lot of errors from the log here, to keep the error log more relevant
      filteredLog = verbose ? queueLog : queueLog.filter((log) => queueKeys.includes(log.serviceName)),
      error       = new Error(`unmet dependencies found, could not resolve dependencies for ${queueKeys.join(', ')}`)
      
      error.code  = 'E_SERVICE_UNABLE_TO_RESOLVE_DEPENDENCIES'
      error.chain = { keys, queueKeys, serviceMap, queue, log:filteredLog }

      throw error
    }

    // recursion until the queue is empty
    this.loadServiceRecursion(queue, verbose, queueLog)
  }

  locate(service)
  {
    return this.locator.locate(service)
  }
}

module.exports = Core
