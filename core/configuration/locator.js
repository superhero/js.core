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
    deepfreeze    = this.locator.locate('core/deepfreeze'),
    configuration = new Configuration(deepclone, deepmerge, deepfind, deepfreeze)

    return configuration
  }
}

module.exports = ConfigurationLocator
