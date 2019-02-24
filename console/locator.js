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
    configuration = this.locator.locate('configuration'),
    console       = new Console(configuration.config.console)

    return console
  }
}

module.exports = ConsoleLocator
