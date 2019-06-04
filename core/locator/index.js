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

  has(name)
  {
    return name in this.services
  }

  locate(service)
  {
    if(service in this.services)
      return this.services[service]

    throw new ServiceUndefinedError(`"${service}" can not be located`)
  }
}

module.exports = Locator
