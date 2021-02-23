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

    if(data instanceof Error)
    {
      data = this.encodeError(data)
    }

    super.emit(name, data)
  }

  /**
   * @private
   * @param {Error} error 
   */
  encodeError(error)
  {
    const
      properties  = Object.getOwnPropertyNames(error),
      output      = {}

    for(const property of properties)
    {
      output[property] = error[property] instanceof Error
      ? this.encodeError(error[property])
      : error[property]
    }

    if(output.chain && output.chain.previousError)
    {
      output.chain.previousError = this.encodeError(output.chain.previousError)
    }

    return output
  }
}

module.exports = Eventbus
