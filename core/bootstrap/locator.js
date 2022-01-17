const Bootstrap = require('.')

class BootstrapLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const console = this.locator.locate('core/console')
    return new Bootstrap(this.locator, console)
  }
}

module.exports = BootstrapLocator
