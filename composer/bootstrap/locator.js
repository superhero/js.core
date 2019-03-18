const ComposerBootstrap = require('.')

class ComposerBootstrapLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    configuration = this.locator.locate('configuration'),
    path          = this.locator.locate('path')

    return new ComposerBootstrap(this.locator, configuration, path)
  }
}

module.exports = ComposerBootstrapLocator
