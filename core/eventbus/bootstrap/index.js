const ObserverContractNotHoneredError = require('./error/observer-contract-not-honered')

class EventbusBootstrap
{
  constructor(configuration, eventbus, locator)
  {
    this.configuration  = configuration
    this.eventbus       = eventbus
    this.locator        = locator
  }

  bootstrap()
  {
    const observers = this.configuration.find('core.eventbus.observers')

    for(const event in observers)
    {
      for(const serviceName in observers[event])
      {
        if(!observers[event][serviceName])
        {
          continue
        }

        const service = this.locator.locate(serviceName)

        if(typeof service.observe !== 'function')
        {
          const msg = `"${serviceName}" does not implement the EventBusObserver interface`
          throw new ObserverContractNotHoneredError(msg)
        }

        this.eventbus.on(event, (data) => service.observe(data, event))
      }
    }
  }
}

module.exports = EventbusBootstrap
