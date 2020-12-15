const EventbusBootstrap = require('.')

class EventbusBootstrapLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    configuration = this.locator.locate('core/configuration'),
    eventbus      = this.locator.locate('core/eventbus'),
    string        = this.locator.locate('core/string')

    return new EventbusBootstrap(configuration, eventbus, this.locator, string)
  }
}

module.exports = EventbusBootstrapLocator
