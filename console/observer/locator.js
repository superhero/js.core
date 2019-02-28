const ConsoleObserver = require('.')

class ConsoleObserverLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const console = this.locator.locate('console')
    return new ConsoleObserver(console)
  }
}

module.exports = ConsoleObserverLocator
