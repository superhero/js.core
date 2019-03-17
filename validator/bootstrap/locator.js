const ValidatorBootstrap = require('.')

class ValidatorBootstrapLocator
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

    return new ValidatorBootstrap(this.locator, configuration, path)
  }
}

module.exports = ValidatorBootstrapLocator
