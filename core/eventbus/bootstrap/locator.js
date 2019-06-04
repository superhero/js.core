const EventBusBootstrap = require('.')

class EventBusBootstrapLocator
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

    return new EventBusBootstrap(configuration, eventbus, this.locator)
  }
}

module.exports = EventBusBootstrapLocator
