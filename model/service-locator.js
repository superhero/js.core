module.exports = class
{
  constructor()
  {
    this.factories  = {}
    this.services   = {}
  }

  set(service, factory)
  {
    'from' in factory
    ? this.factories[service] = factory.from.bind(factory)
    : this.factories[service] = factory
  }

  async create(service)
  {
    if(service in this.factories)
      return await this.factories[service](this)

    const error = new Error(`"${service}" does not have a specified factory`)
    error.code = 'ERR_SERVICE_FACTORY_UNDEFINED'
    throw error
  }

  async load(service)
  {
    return service in this.services
    ? this.services[service]
    : this.services[service] = await this.create(service)
  }
}
