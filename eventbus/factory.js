const
ObserverContractNotHoneredError = require('./error/observer-contract-not-honered'),
EventBus = require('.')

class EventBusFactory
{
  constructor(locator)
  {
    this.locator = locator
  }

  create()
  {
    const
    configuration = this.locator.locate('configuration'),
    path          = this.locator.locate('path'),
    eventbus      = new EventBus(configuration.config.eventbus.options)

    for(const event in configuration.config.eventbus.observers)
    {
      const
      serviceName = configuration.config.eventbus.observers[event],
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

module.exports = EventBusFactory
