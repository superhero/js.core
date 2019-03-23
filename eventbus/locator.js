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
    eventbus        = new EventBus(eventbusOptions, observersKeys)

    return eventbus
  }
}

module.exports = EventBusLocator
