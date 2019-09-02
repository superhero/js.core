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

  observe(data)
  {
    this.console.log(data)
    this.eventbus.emit('logged calculation appended event', data)
  }
}

module.exports = ObserverCalculationAppendedLog
