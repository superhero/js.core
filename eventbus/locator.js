const
ObserverContractNotHoneredError = require('./error/observer-contract-not-honered'),
EventBus = require('.')

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
    path            = this.locator.locate('path'),
    eventbus        = new EventBus(eventbusOptions)

    for(const event in observers)
    {
      const
      serviceName = observers[event],
      service     = this.locator.locate(serviceName)

      if(typeof service.observe !== 'functions')
      {
        const msg = `"${serviceName}" does not implement the EventBusObserver interface`
        throw new ObserverContractNotHoneredError(msg)
      }

      const observer = service.observe.bind(service)
      eventbus.on(event, observer)
    }

    return eventbus
  }
}

module.exports = EventBusLocator
