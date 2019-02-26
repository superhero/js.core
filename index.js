// TODO this should be placed elsewhere, and handled differetn
process.on('unhandledRejection', (...args) => console.log('unhandledRejection', ...args))

class Core
{
  constructor(locator)
  {
    this.locator = locator
  }

  add(component)
  {
    const
    configuration = this.locate('configuration'),
    path          = this.locate('path'),
    // component paths
    localPath     = `${path.main.dirname}/${component}/config`,
    dependentPath = `${component}/config`,
    corePath      = `${__dirname}/${component}/config`

    if(path.isResolvable(localPath))
    {
      const config = require(localPath)
      configuration.extend(config)
    }
    else if(path.isResolvable(dependentPath))
    {
      const config = require(dependentPath)
      configuration.extend(config)
    }
    else if(path.isResolvable(corePath))
    {
      const config = require(corePath)
      configuration.extend(config)
    }
    else
    {
      throw new Error(`could not add component "${component}"`)
    }
  }

  load()
  {
    const configuration = this.locator.locate('configuration')
    for(const name in configuration.config.locator)
      this.loadService(name)
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
      locator = new Locator(this.locator),
      service = locator.locate()

      this.locator.set(name, service)
    }
    else
    {
      throw new Error(`locator could not be found for ${name}`)
    }
  }

  locate(service)
  {
    return this.locator.locate(service)
  }
}

module.exports = Core
