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
    console         = this.locator.locate('core/console'),
    eventbus        = new Eventbus(eventbusOptions, console)

    return eventbus
  }
}

module.exports = EventbusLocator
