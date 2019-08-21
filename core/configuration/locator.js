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
    deepclone     = this.locator.locate('core/deepclone'),
    deepmerge     = this.locator.locate('core/deepmerge'),
    deepfind      = this.locator.locate('core/deepfind'),
    configuration = new Configuration(deepclone, deepmerge, deepfind)

    return configuration
  }
}

module.exports = ConfigurationLocator
