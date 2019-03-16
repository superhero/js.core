class EventBusBootstrap
{
  constructor(eventbus)
  {
    this.eventbus = eventbus
  }

  bootstrap()
  {
    process.on('unhandledRejection',  this.onError.bind(this))
    process.on('uncaughtException',   this.onError.bind(this))

    process.on('SIGINT',  this.onSignal.bind(this, 'SIGINT'))
    process.on('SIGTERM', this.onSignal.bind(this, 'SIGTERM'))
  }

  onError(error, rejectedPromise)
  {
    if(rejectedPromise && rejectedPromise.domain)
    {
      rejectedPromise.domain.emit('error', error)
    }
    else if(process.domain)
    {
      process.domain.emit('error', error)
    }
    else
    {
      this.eventbus.emit('core.error', error)
    }
  }

  onSignal(signal)
  {
    const warning = `Process signal received: "${signal}", `
                  + `event "core.process.signal" emitted, `
                  + `manual configuration required to end the process`

    this.eventbus.emit('core.warning', warning)
    this.eventbus.emit('core.process.signal', signal)
  }
}

module.exports = EventBusBootstrap
