const CoreError = require('./core/error')

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
    const configuration = this.locate('configuration')

    // extending the configurations of every component
    for(const component in this.components)
    {
      const config = this.fetchComponentConfig(component, this.components[component])
      configuration.extend(config)
    }

    // eager loading the services in the sevice locator
    for(const name in configuration.config.locator)
    {
      this.loadService(name)
    }
  }

  fetchComponentConfig(component, pathname)
  {
    const
    path          = this.locate('path'),
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
      throw new CoreError(`could not resolve path to component "${component}"`)
  }

  loadService(name)
  {
    const
    configuration = this.locator.locate('configuration'),
    path          = this.locator.locate('path'),
    locatorPath   = `${configuration.config.locator[name]}/locator`

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
      catch(erro)
      {
        switch(error.code)
        {
          case 'E_SERVICE_UNDEFINED':
            const msg = `An unmet dependency was found for service "${name}", error: "${error.message}"`
            throw new CoreError(msg)

          default:
            throw error
        }
      }
    }
    else
    {
      throw new CoreError(`locator could not be found for ${name}`)
    }
  }

  locate(service)
  {
    return this.locator.locate(service)
  }
}

module.exports = Core
