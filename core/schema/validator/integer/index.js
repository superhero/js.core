const InvalidIntegerError = require('./error/invalid')
/**
 * @implements {SchemaValidator}
 */
class SchemaValidatorInteger
{
  valid(options, data)
  {
    if(typeof data !== 'number')
    {
      const msg = `Invalid type: "${typeof data}", number expected`
      throw new InvalidIntegerError(msg)
    }

    if(data !== parseInt(data))
    {
      const msg = `Integer expected, found decimals`
      throw new InvalidIntegerError(msg)
    }

    if(options.unsigned
    && data < 0)
    {
      const msg = `Expected an unsigned integer `
      throw new InvalidIntegerError(msg)
    }

    if('min' in options
    && data < options.min)
    {
      const msg = `Integer must be minimum: "${options.min}"`
      throw new InvalidIntegerError(msg)
    }

    if('max' in options
    && data > options.max)
    {
      const msg = `Integer can't be more then: "${options.max}"`
      throw new InvalidIntegerError(msg)
    }

    if('gt' in options
    && data < options.gt)
    {
      const msg = `Integer must be more then: "${options.gt}"`
      throw new InvalidIntegerError(msg)
    }

    if('lt' in options
    && data > options.lt)
    {
      const msg = `Integer must be less then: "${options.lt}"`
      throw new InvalidIntegerError(msg)
    }

    if(options.enum
    &&!options.enum.includes(data))
    {
      const msg = `Expected one of the enumeral values: "${options.enum}"`
      throw new InvalidIntegerError(msg)
    }
  }
}

module.exports = SchemaValidatorInteger
