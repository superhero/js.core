const ConsoleObserverInfo = require('.')

class ConsoleObserverInfoLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const console = this.locator.locate('core/console')
    return new ConsoleObserverInfo(console)
  }
}

module.exports = ConsoleObserverInfoLocator
