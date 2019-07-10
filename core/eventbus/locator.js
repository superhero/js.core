const Eventbus = require('.')

class EventbusLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    configuration   = this.locator.locate('core/configuration'),
    eventbusOptions = configuration.find('core.eventbus.options'),
    observers       = configuration.find('core.eventbus.observers'),
    observersKeys   = Object.keys(observers || {}),
    path            = this.locator.locate('core/path'),
    console         = this.locator.locate('core/console'),
    eventbus        = new Eventbus(eventbusOptions, observersKeys, console)

    return eventbus
  }
}

module.exports = EventbusLocator
