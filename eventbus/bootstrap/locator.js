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
    configuration = this.locator.locate('configuration'),
    eventbus      = this.locator.locate('eventbus')

    return new EventBusBootstrap(configuration, eventbus, this.locator)
  }
}

module.exports = EventBusBootstrapLocator
