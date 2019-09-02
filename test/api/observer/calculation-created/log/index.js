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

  observe(data)
  {
    this.console.log(data)
    this.eventbus.emit('logged calculation created event', data)
  }
}

module.exports = ObserverCalculationCreatedLog
