const Events = require('events')

class EventBus extends Events
{
  constructor(options, observers, console)
  {
    super(options)
    this.observers  = observers
    this.console    = console
  }

  emit(name, data)
  {
    if(!this.observers.includes(name))
      this.console.warning(`event: "${name}" does not have a defined observer`)

    super.emit(name, { name , data })
  }
}

module.exports = EventBus
