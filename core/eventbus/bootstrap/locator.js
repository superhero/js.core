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
    eventbus      = this.locator.locate('core/eventbus')

    return new EventbusBootstrap(configuration, eventbus, this.locator)
  }
}

module.exports = EventbusBootstrapLocator
