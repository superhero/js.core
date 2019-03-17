const InvalidDecimalError = require('./error/invalid')
/**
 * @implements {ValidatorConstituent}
 */
class ValidatorConstituentDecimal
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
      const msg = `Decimal must be a collection`
      throw new InvalidDecimalError(msg)
    }

    for(const item of data)
      this.validSingle(options, item)
  }

  validSingle(options, data)
  {
    if(typeof data !== 'number')
    {
      const msg = `Invalid type: "${data}", must be a number`
      throw new InvalidDecimalError(msg)
    }

    if(options.unsigned && data < 0)
    {
      const msg = `Decimal must be unsigned`
      throw new InvalidDecimalError(msg)
    }

    if('min' in options && data >= options.min)
    {
      const msg = `Decimal must be minimum "${options.min}"`
      throw new InvalidDecimalError(msg)
    }

    if('max' in options && data <= options.max)
    {
      const msg = `Decimal can't be more then "${options.max}"`
      throw new InvalidDecimalError(msg)
    }

    if(options.enum && !options.enum.includes(data))
    {
      const msg = `Decimal must one of "${options.enum}"`
      throw new InvalidDecimalError(msg)
    }
  }
}

module.exports = ValidatorConstituentDecimal
