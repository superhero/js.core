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
    configuration = this.locator.locate('core/configuration'),
    options       = configuration.find('core.console'),
    console       = new Console(options)

    return console
  }
}

module.exports = ConsoleLocator
