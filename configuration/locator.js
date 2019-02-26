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
    deepcopy      = this.locator.locate('deepcopy'),
    deepmerge     = this.locator.locate('deepmerge'),
    deepfind      = this.locator.locate('deepfind'),
    configuration = new Configuration(deepcopy, deepmerge, deepfind)

    return configuration
  }
}

module.exports = ConfigurationLocator
