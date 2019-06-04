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
      const bootstrap = this.locator.locate(bootstrapMap[key])
      await bootstrap.bootstrap()
    }
  }
}

module.exports = Bootstrap
