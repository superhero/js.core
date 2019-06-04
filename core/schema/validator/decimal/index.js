const InvalidDecimalError = require('./error/invalid')
/**
 * @implements {SchemaValidator}
 */
class SchemaValidatorDecimal
{
  valid(options, data)
  {
    if(typeof data !== 'number')
    {
      const msg = `Invalid type: "${typeof data}", number expected`
      throw new InvalidDecimalError(msg)
    }

    if(options.unsigned
    && data < 0)
    {
      const msg = `Expected an unsigned decimal`
      throw new InvalidDecimalError(msg)
    }

    if('min' in options
    && data < options.min)
    {
      const msg = `Decimal must be minimum: "${options.min}"`
      throw new InvalidDecimalError(msg)
    }

    if('max' in options
    && data > options.max)
    {
      const msg = `Decimal can't be more then: "${options.max}"`
      throw new InvalidDecimalError(msg)
    }

    if('gt' in options
    && data > options.gt)
    {
      const msg = `Decimal must be more then: "${options.gt}"`
      throw new InvalidDecimalError(msg)
    }

    if('lt' in options
    && data < options.lt)
    {
      const msg = `Decimal must be less then: "${options.lt}"`
      throw new InvalidDecimalError(msg)
    }

    if(options.enum
    &&!options.enum.includes(data))
    {
      const msg = `Expected one of the enumeral values: "${options.enum}"`
      throw new InvalidDecimalError(msg)
    }
  }
}

module.exports = SchemaValidatorDecimal
