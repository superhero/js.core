const EventBusBootstrap = require('.')

class EventBusBootstrapLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    return new EventBusBootstrap(this.locator)
  }
}

module.exports = EventBusBootstrapLocator
