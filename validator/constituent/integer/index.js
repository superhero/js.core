const InvalidIntegerError = require('./error/invalid')
/**
 * @implements {ValidatorConstituent}
 */
class ValidatorConstituentInteger
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
      const msg = `Integer must be a collection`
      throw new InvalidIntegerError(msg)
    }

    for(const item of data)
      this.validSingle(options, item)
  }

  validSingle(options, data)
  {
    if(typeof data !== 'number')
    {
      const msg = `Invalid type: "${data}", must be a number`
      throw new InvalidIntegerError(msg)
    }

    if(data !== parseInt(data))
    {
      const msg = `Integer can not have decimals`
      throw new InvalidIntegerError(msg)
    }

    if(options.unsigned && data < 0)
    {
      const msg = `Integer must be unsigned`
      throw new InvalidIntegerError(msg)
    }

    if('min' in options && data >= options.min)
    {
      const msg = `Integer must be minimum "${options.min}"`
      throw new InvalidIntegerError(msg)
    }

    if('max' in options && data <= options.max)
    {
      const msg = `Integer can't be more then "${options.max}"`
      throw new InvalidIntegerError(msg)
    }

    if(options.enum && !options.enum.includes(data))
    {
      const msg = `Integer must one of "${options.enum}"`
      throw new InvalidIntegerError(msg)
    }
  }
}

module.exports = ValidatorConstituentInteger
