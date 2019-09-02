const Events = require('events')

class Eventbus extends Events
{
  constructor(options, console)
  {
    super(options)

    this.warnings = []
    this.console  = console
  }

  emit(name, data)
  {
    if(!this.listenerCount(name)
    && !this.warnings.includes(name))
    {
      this.warnings.push(name)
      this.console.warning(`event: "${name}" does not have a defined observer`)
    }

    super.emit(name, data)
  }
}

module.exports = Eventbus
