/**
 * @memberof Api
 * @implements {superhero/core/eventbus/observer}
 */
class ObserverCalculationCreatedLog
{
  constructor(console, eventbus)
  {
    this.console  = console
    this.eventbus = eventbus
  }

  observe(event)
  {
    this.console.log(event.data)
    this.eventbus.emit('logged calculation created event', event.data)
  }
}

module.exports = ObserverCalculationCreatedLog
