class EventBusBootstrap
{
  constructor(eventbus)
  {
    this.eventbus = eventbus
  }

  bootstrap()
  {
    process.on('unhandledRejection', (error) => this.eventbus.emit('core.error', error))
  }
}

module.exports = EventBusBootstrap
