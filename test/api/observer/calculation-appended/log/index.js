/**
 * @memberof Api
 * @implements {superhero/core/eventbus/observer}
 */
class ObserverCalculationAppendedLog
{
  constructor(console, eventbus)
  {
    this.console  = console
    this.eventbus = eventbus
  }

  observe(event)
  {
    this.console.log(event.data)
    this.eventbus.emit('logged calculation appended event', event.data)
  }
}

module.exports = ObserverCalculationAppendedLog
