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

    for(const key in bootstrapMap)
    {
      const serviceName = bootstrapMap[key]
      try
      {
        const service = this.locator.locate(serviceName)
        await service.bootstrap()
      }
      catch(previousError)
      {
        const error = new Error('could not fullfill the bootstrap process for service')
        error.code  = 'E_CORE_BOOTSTRAP'
        error.chain = { previousError, key, serviceName, bootstrapMap }
        throw error
      }
    }
  }
}

module.exports = Bootstrap
