const ConsoleObserverWarning = require('.')

class ConsoleObserverWarningLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const console = this.locator.locate('core/console')
    return new ConsoleObserverWarning(console)
  }
}

module.exports = ConsoleObserverWarningLocator
