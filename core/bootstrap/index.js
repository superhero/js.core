class Bootstrap
{
  constructor(locator)
  {
    this.locator = locator
  }

  async bootstrap()
  {
    const
    configuration = this.locator.locate('core/configuration'),
    bootstrapMap  = configuration.find('core.bootstrap')

    for(const serviceName of bootstrapMap)
    {
      if(serviceName)
      {
        const service = this.locator.locate(serviceName)
        await service.bootstrap()
      }
    }
  }
}

module.exports = Bootstrap
