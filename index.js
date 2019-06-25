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

  load()
  {
    const configuration = this.locate('core/configuration')

    // extending the configurations of every component
    for(const component in this.components)
    {
      const config = this.fetchComponentConfig(component, this.components[component])
      configuration.extend(config)
    }

    // eager loading the services in the sevice locator
    for(const name in configuration.find('core.locator'))
    {
      this.loadService(name)
    }
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

  locate(service)
  {
    return this.locator.locate(service)
  }
}

module.exports = Core
