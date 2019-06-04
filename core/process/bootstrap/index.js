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
}

module.exports = EventBusBootstrap
