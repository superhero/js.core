const ObserverContractNotHoneredError = require('./error/observer-contract-not-honered')

class EventBusBootstrap
{
  constructor(locator)
  {
    this.locator = locator
  }

  bootstrap()
  {
    const
    configuration = this.locator.locate('configuration'),
    eventbus      = this.locator.locate('eventbus'),
    observers     = configuration.find('eventbus.observers')

    for(const event in observers)
      for(const serviceName of observers[event])
      {
        const service = this.locator.locate(serviceName)

        if(typeof service.observe !== 'function')
        {
          const msg = `"${serviceName}" does not implement the EventBusObserver interface`
          throw new ObserverContractNotHoneredError(msg)
        }

        const observer = service.observe.bind(service)
        eventbus.on(event, observer)
      }
  }
}

module.exports = EventBusBootstrap
