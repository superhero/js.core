const Console = require('.')

class ConsoleLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    options = this.locator.locate('configuration').find('config.console'),
    console = new Console(options)

    return console
  }
}

module.exports = ConsoleLocator
