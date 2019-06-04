const Configuration = require('.')

class ConfigurationLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    deepcopy      = this.locator.locate('core/deepcopy'),
    deepmerge     = this.locator.locate('core/deepmerge'),
    deepfind      = this.locator.locate('core/deepfind'),
    configuration = new Configuration(deepcopy, deepmerge, deepfind)

    return configuration
  }
}

module.exports = ConfigurationLocator
