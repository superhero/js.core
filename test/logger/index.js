/**
 * @implements {@superhero/eventbus/observer}
 */
class Logger
{
  constructor(eventbus)
  {
    this.eventbus = eventbus
  }

  observe(event)
  {
    this.eventbus.emit('logger.logged-event', event)
  }
}

module.exports = Logger
