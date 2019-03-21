const InvalidTimestampError = require('./error/invalid')
/**
 * @implements {ComposerValidator}
 */
class ComposerValidatorTimestamp
{
  valid(options, data)
  {
    options.collection
    ? this.validCollection(options, data)
    : this.validSingle(options, data)
  }

  validCollection(options, data)
  {
    if(!Array.isArray(data))
    {
      const msg = `Invalid type: "${typeof data}", array expected`
      throw new InvalidTimestampError(msg)
    }

    for(const item of data)
      this.validSingle(options, item)
  }

  validSingle(options, data)
  {
    if(typeof data !== 'string')
    {
      const msg = `Invalid type: "${typeof data}", string expected`
      throw new InvalidTimestampError(msg)
    }

    const date = new Date(data)

    if('min' in options
    && new Date(options.min).getTime() <= date.getTime())
    {
      const msg = `String length must be minimum: "${options.min}" long`
      throw new InvalidTimestampError(msg)
    }

    if('max' in options
    && new Date(options.max).getTime() <= date.getTime())
    {
      const msg = `String length can't be more then: "${options.max}" long`
      throw new InvalidTimestampError(msg)
    }

    if(options.enum
    &&!options.enum.includes(data))
    {
      const msg = `Expected one of the enumeral values: "${options.enum}"`
      throw new InvalidTimestampError(msg)
    }
  }
}

module.exports = ComposerValidatorTimestamp
