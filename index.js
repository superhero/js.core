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
    serviceMap    = configuration.find('core.locator'),
    serviceNames  = Object.keys(serviceMap)

    // eager loading the services in the sevice locator
    this.loadServiceRecursion(serviceNames)
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

  loadService(name)
  {
    const
    configuration = this.locator.locate('core/configuration'),
    path          = this.locator.locate('core/path'),
    locatorPath   = `${configuration.find('core.locator')[name]}/locator`

    if(path.isResolvable(locatorPath))
    {
      const
      Locator = require(locatorPath),
      locator = new Locator(this.locator)

      try
      {
        const service = locator.locate()
        this.locator.set(name, service)
      }
      catch(error)
      {
        switch(error.code)
        {
          case 'E_SERVICE_UNDEFINED':
          {
            const
            msg                   = `An unmet dependency was found for service "${name}", error: ${error.message}`,
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
      msg   = `locator could not be found for ${name}`,
      error = new Error(msg)

      error.code = 'E_SERVICE_LOCATOR_NOT_FOUND'
      throw error
    }
  }

  /**
   * Eager loading the services in the sevice locator.
   * Recursion queue to complete loading all services.
   * @param {Array<string>} services names of services
   */
  loadServiceRecursion(services)
  {
    // when the queu is empty, then we are done
    if(services.length === 0)
      return

    // incomplete services that could not be loaded in the declared order
    const queue = []

    // looping through different service names in an attempt to eager load them
    // if an "unmet dependency" error is thrown, the service name is pushed to a queue to be located at a later stage
    // in hope that the earlier unmet dependency then is locatable
    for(const serviceName of services)
    {
      try
      {
        this.loadService(serviceName)
      }
      catch(error)
      {
        switch (error.code)
        {
          case 'E_SERVICE_UNMET_DEPENDENCY':
            queue.push(serviceName)
            break;

          default:
            throw error
        }
      }
    }

    // if the new queue is the same as the old queue, then no progress has taken place
    if(services.length === queue.length)
    {
      const error = new Error(`Unmet dependencies found, could not resolve dependencies for ${queue.join(', ')}`)
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
