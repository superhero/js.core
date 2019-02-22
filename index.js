// TODO this should be placed elsewhere, and handled differetn
process.on('unhandledRejection', (...args) => console.log('unhandledRejection', ...args))

const Locator = require('./locator')

class Core
{
  constructor(locator)
  {
    this.locator = locator
  }

  add(component)
  {
    const
    configuration = this.locator.locate('configuration'),
    path          = this.locator.locate('path'),
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
      throw new Error('gtfo...')
    }
  }

  load()
  {
    const
    configuration = this.locator.locate('configuration'),
    path          = this.locator.locate('path')

    for(const name in configuration.config.locator)
    {
      const factoryPath = `${configuration.config.locator[name]}/factory`

      if(path.isResolvable(factoryPath))
      {
        const
        Factory = require(factoryPath),
        factory = new Factory(this.locator),
        service = factory.create()

        configuration.locator.set(name, service)
      }
      else
      {
        throw new Error('gtfo...')
      }
    }
  }

  locate(service)
  {
    return this.locator.locate(service)
  }
}

module.exports = Core
