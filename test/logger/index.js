/**
 * @implements {@superhero/eventbus/observer}
 */
class Logger
{
  constructor(console, eventbus)
  {
    this.console  = console
    this.eventbus = eventbus
  }

  observe(event)
  {
    this.console.log(event)
    this.eventbus.emit('logger.logged-event', event)
  }
}

module.exports = Logger
