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
    options       = configuration.find('config.console'),
    console       = new Console(options)

    return console
  }
}

module.exports = ConsoleLocator
