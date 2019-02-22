const ServiceUndefinedError = require('./error/service-undefined')

class Locator
{
  constructor()
  {
    this.services = {}
  }

  set(name, service)
  {
    this.services[name] = service
  }

  locate(service)
  {
    if(service in this.services)
      return this.services[service]

    throw new ServiceUndefinedError(`"${service}" does not have a specified factory`)
  }
}

module.exports = Locator
