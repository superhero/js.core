const InvalidStringError = require('./error/invalid')
/**
 * @implements {SchemaValidator}
 */
class SchemaValidatorString
{
  valid(options, data)
  {
    if(typeof data !== 'string')
    {
      const msg = `Invalid type: "${typeof data}", string expected`
      throw new InvalidStringError(msg)
    }

    if(options['not-empty']
    && !data.length)
    {
      const msg = `Must not be empty`
      throw new InvalidStringError(msg)
    }

    if('min' in options
    && data.length < options.min)
    {
      const msg = `String length must be minimum: "${options.min}" long`
      throw new InvalidStringError(msg)
    }

    if('max' in options
    && data.length > options.max)
    {
      const msg = `String length can't be more then: "${options.max}" long`
      throw new InvalidStringError(msg)
    }

    if('length' in options
    && data.length !== options.length)
    {
      const msg = `String length must be ${options.length}`
      throw new InvalidStringError(msg)
    }

    if(options.enum
    &&!options.enum.includes(data))
    {
      const msg = `Expected one of the enumeral values: "${options.enum}"`
      throw new InvalidStringError(msg)
    }

    if(options.uppercase
    && data !== data.toUpperCase())
    {
      const msg = `Upper case string expected`
      throw new InvalidStringError(msg)
    }

    if(options.lowercase
    && data !== data.toLowerCase())
    {
      const msg = `Lower case string expected`
      throw new InvalidStringError(msg)
    }
  }
}

module.exports = SchemaValidatorString
