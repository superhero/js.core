class Bootstrap
{
  constructor(locator)
  {
    this.locator = locator
  }

  async bootstrap()
  {
    const configuration = this.locator.locate('configuration')
    for(const key in configuration.find('bootstrap'))
    {
      const bootstrap = this.locator.locate(configuration.config.bootstrap[key])
      await bootstrap.bootstrap()
    }
  }
}

module.exports = Bootstrap
