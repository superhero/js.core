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
    observers       = configuration.find('eventbus.observers'),
    observersKeys   = Object.keys(observers || {}),
    path            = this.locator.locate('path'),
    console         = this.locator.locate('console'),
    eventbus        = new EventBus(eventbusOptions, observersKeys, console)

    return eventbus
  }
}

module.exports = EventBusLocator
