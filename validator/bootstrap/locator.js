const ValidatorBootstrap = require('.')

class ValidatorBootstrapLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const configuration = this.locator.locate('configuration')
    return new ValidatorBootstrap(this.locator, configuration)
  }
}

module.exports = ValidatorBootstrapLocator
