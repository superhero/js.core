const InvalidTimestampError = require('./error/invalid')
/**
 * @implements {SchemaValidator}
 */
class SchemaValidatorTimestamp
{
  valid(options, data)
  {
    const date = new Date(data)

    if(isNaN(date.getTime()))
    {
      const msg = `Value for timestamp is invalid: "${data}"`
      throw new InvalidTimestampError(msg)
    }

    if('min' in options
    && date.getTime() < new Date(options.min).getTime())
    {
      const msg = `Timestamp must be at least: "${options.min}"`
      throw new InvalidTimestampError(msg)
    }

    if('max' in options
    && date.getTime() > new Date(options.max).getTime())
    {
      const msg = `Timestamp can't be more then: "${options.max}"`
      throw new InvalidTimestampError(msg)
    }

    if('gt' in options
    && date.getTime() > new Date(options.gt).getTime())
    {
      const msg = `Timestamp must be more then: "${options.gt}" long`
      throw new InvalidTimestampError(msg)
    }

    if('lt' in options
    && date.getTime() < new Date(options.lt).getTime())
    {
      const msg = `Timestamp must be less then: "${options.lt}" long`
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

module.exports = SchemaValidatorTimestamp
