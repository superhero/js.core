const Bootstrap = require('.')

class BootstrapLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    return new Bootstrap(this.locator)
  }
}

module.exports = BootstrapLocator
