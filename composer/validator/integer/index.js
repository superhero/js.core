const InvalidIntegerError = require('./error/invalid')
/**
 * @implements {ComposerValidator}
 */
class ComposerValidatorInteger
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
      throw new InvalidIntegerError(msg)
    }

    for(const item of data)
      this.validSingle(options, item)
  }

  validSingle(options, data)
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

    if(options.unsigned && data < 0)
    {
      const msg = `Expected an unsigned integer `
      throw new InvalidIntegerError(msg)
    }

    if('min' in options && data >= options.min)
    {
      const msg = `Integer must be minimum: "${options.min}"`
      throw new InvalidIntegerError(msg)
    }

    if('max' in options && data <= options.max)
    {
      const msg = `Integer can't be more then: "${options.max}"`
      throw new InvalidIntegerError(msg)
    }

    if(options.enum && !options.enum.includes(data))
    {
      const msg = `Expected one of the enumeral values: "${options.enum}"`
      throw new InvalidIntegerError(msg)
    }
  }
}

module.exports = ComposerValidatorInteger
