const EventBus = require('.')

class EventBusLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    configuration   = this.locator.locate('configuration'),
    eventbusOptions = configuration.find('eventbus.options'),
    path            = this.locator.locate('path'),
    eventbus        = new EventBus(eventbusOptions)

    return eventbus
  }
}

module.exports = EventBusLocator
