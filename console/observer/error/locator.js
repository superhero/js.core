const ConsoleObserverError = require('.')

class ConsoleObserverErrorLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const console = this.locator.locate('console')
    return new ConsoleObserverError(console)
  }
}

module.exports = ConsoleObserverErrorLocator
