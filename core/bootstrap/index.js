class Bootstrap
{
  constructor(locator, console)
  {
    this.locator = locator
    this.console = console
  }

  async bootstrap()
  {
    const
      configuration = this.locator.locate('core/configuration'),
      bootstrapMap  = configuration.find('core.bootstrap')

    this.console.color('cyan').log('Bootstrap process')
    this.console.color('cyan').log('')

    for(const key in bootstrapMap)
    {
      const serviceName = bootstrapMap[key]

      if(serviceName)
      {
        try
        {
          const service = this.locator.locate(serviceName)
          await service.bootstrap()
          this.console.color('cyan').log(`✔ ${serviceName}`)
        }
        catch(previousError)
        {
          const error = new Error('could not fullfill the bootstrap process for service')
          error.code  = 'E_CORE_BOOTSTRAP'
          error.chain = { previousError, key, serviceName, bootstrapMap }

          this.console.error(error)
          this.console.error('bootstrap process error discovered, terminating process...')
          process.nextTick(() => process.kill(process.pid, 'SIGKILL'))

          throw error
        }
      }
    }

    this.console.color('cyan').log('')
  }
}

module.exports = Bootstrap
