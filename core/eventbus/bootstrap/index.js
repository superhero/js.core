const ObserverContractNotHoneredError = require('./error/observer-contract-not-honered')

class EventbusBootstrap
{
  constructor(configuration, eventbus, locator, string)
  {
    this.configuration  = configuration
    this.eventbus       = eventbus
    this.locator        = locator
    this.string         = string
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

        const
          service   = this.locator.locate(serviceName),
          observer  = 'on' + this.string.composeCamelCase(event.replace(/-/g, ' '), ' ', true)

        if(typeof service[observer] === 'function')
        {
          this.eventbus.on(event, (data) => service[observer](data, event))
        }
        else if(typeof service.observe === 'function')
        {
          this.eventbus.on(event, (data) => service.observe(data, event))
        }
        else
        {
          const msg = `"${serviceName}" does not have a recognizable observer interface`
          throw new ObserverContractNotHoneredError(msg)
        }
      }
    }
  }
}

module.exports = EventbusBootstrap
