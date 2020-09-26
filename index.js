const fs = require('fs')

class Core
{
  constructor(locator)
  {
    this.locator    = locator
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

  load()
  {
    try
    {
      const
      queueLog              = [],
      configuration         = this.buildConfiguration(queueLog),
      serviceMapUncomposed  = configuration.find('core.locator'),
      serviceMap            = this.composeServiceMap(serviceMapUncomposed)
  
      try
      {
        // eager loading the services in the sevice locator
        this.loadServiceRecursion(serviceMap, queueLog)
      }
      catch(previousError)
      {
        const error = new Error('the core failed to load - runtime error in the eager loading process - see consol log for more information')

        error.code  = 'E_CORE_LOAD'
        error.chain = { configuration, serviceMap, previousError }

        throw error
      }
    }
    catch(error)
    {
      this.locate('core/console').error(error)
      throw error
    }
  }

  buildConfiguration(queueLog)
  {
    const configuration = this.locate('core/configuration')

    // extending the configurations of every component
    for(const component in this.components)
    {
      const config = this.fetchComponentConfig(component, this.components[component])
      configuration.extend(config)
    }

    const branch = configuration.find('core.branch')

    // extending the configurations of every component for a specific branch
    if(branch)
    {
      for(const component in this.components)
      {
        try
        {
          const config = this.fetchComponentConfig(component, this.components[component], branch)
          configuration.extend(config)
        }
        catch(error)
        {
          // ... we don't need to do anything if the configuration doesn't exist,
          // or maybe emit a warning or info log message through the eventbus ...

          queueLog.push({ message:error.message })
        }
      }
    }
    else
    {
      console.log(`core log message: no configuration branch is set`)
    }

    configuration.freeze()

    return configuration
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
  loadServiceRecursion(serviceMap, queueLog)
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
      const 
      // filtereing off a lot of errors from the log here, to keep the error log more relevant
      filteredLog = queueLog.filter((log) => queueKeys.includes(log.serviceName)),
      error       = new Error(`unmet dependencies found, could not resolve dependencies for ${queueKeys.join(', ')}`)
      
      error.code  = 'E_SERVICE_UNABLE_TO_RESOLVE_DEPENDENCIES'
      error.chain = { keys, queueKeys, serviceMap, queue, log:filteredLog }

      throw error
    }

    // recursion until the queue is empty
    this.loadServiceRecursion(queue, queueLog)
  }

  locate(service)
  {
    return this.locator.locate(service)
  }
}

module.exports = Core
