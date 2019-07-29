const Events = require('events')

class Eventbus extends Events
{
  constructor(options, observers, console)
  {
    super(options)

    this.warnings   = []
    this.observers  = observers
    this.console    = console
  }

  emit(name, data)
  {
    if(!this.observers.includes(name)
    && !this.warnings.includes(name))
    {
      this.warnings.push(name)
      this.console.warning(`event: "${name}" does not have a defined observer`)
    }

    super.emit(name, { name , data })
  }
}

module.exports = Eventbus
