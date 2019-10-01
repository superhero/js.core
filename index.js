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
    const configuration = this.locate('core/configuration')

    // extending the configurations of every component
    for(const component in this.components)
    {
      const config = this.fetchComponentConfig(component, this.components[component])
      configuration.extend(config)
    }

    configuration.freeze()

    const
    serviceMapUncomposed  = configuration.find('core.locator'),
    serviceMap            = this.composeServiceMap(serviceMapUncomposed)

    // eager loading the services in the sevice locator
    this.loadServiceRecursion(serviceMap)
  }

  /**
   * The ability to include by asterix is solved by this method
   */
  composeServiceMap(serviceMapUncomposed)
  {
    const serviceMap = {}

    for(const serviceNameUncomposed in serviceMapUncomposed)
    {
      if(serviceNameUncomposed.endsWith('/*'))
      {
        const
        directoryPath = serviceMapUncomposed[serviceNameUncomposed].slice(0, -1),
        dirents         = fs.readdirSync(directoryPath, { withFileTypes:true })

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

  fetchComponentConfig(component, pathname)
  {
    const
    path          = this.locate('core/path'),
    specifiedPath = `${pathname}/config`,
    localPath     = `${path.main.dirname}/${component}/config`,
    absolutePath  = `${component}/config`,
    corePath      = `${__dirname}/${component}/config`

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

      error.code = 'E_COMPONENT_NOT_RESOLVABLE'
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
      const
      Locator = require(locatorPath),
      locator = new Locator(this.locator)

      try
      {
        const service = locator.locate()
        this.locator.set(serviceName, service)
      }
      catch(error)
      {
        switch(error.code)
        {
          case 'E_SERVICE_UNDEFINED':
          {
            const
            msg                   = `An unmet dependency was found for service "${serviceName}", error: ${error.message}`,
            errorUnmetDependency  = new Error(msg)

            errorUnmetDependency.code = 'E_SERVICE_UNMET_DEPENDENCY'
            throw errorUnmetDependency
          }

          default:
            throw error
        }
      }
    }
    else
    {
      const
      msg   = `locator could not be found for ${serviceName}`,
      error = new Error(msg)

      error.code = 'E_SERVICE_LOCATOR_NOT_FOUND'
      throw error
    }
  }

  /**
   * Eager loading the services in the sevice locator.
   * Recursion queue to complete loading all services.
   * @param {Object} serviceMap [names of services] => [filepath of services]
   */
  loadServiceRecursion(serviceMap)
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
            queue[serviceName] = serviceMap[serviceName]
            break;

          default:
            throw error
        }
      }
    }

    const queueKeys = Object.keys(queue)

    // if the new queue is the same as the old queue, then no progress has taken place
    if(keys.length === queueKeys.length)
    {
      const error = new Error(`Unmet dependencies found, could not resolve dependencies for ${queueKeys.join(', ')}`)
      error.code = 'E_SERVICE_UNABLE_TO_RESOLVE_DEPENDENCIES'

      throw error
    }

    // recursion until the queue is empty
    this.loadServiceRecursion(queue)
  }

  locate(service)
  {
    return this.locator.locate(service)
  }
}

module.exports = Core
