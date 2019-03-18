const InvalidBooleanError = require('./error/invalid')
/**
 * @implements {ComposerValidator}
 */
class ComposerValidatorBoolean
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
      throw new InvalidBooleanError(msg)
    }

    for(const item of data)
      this.validSingle(options, item)
  }

  validSingle(options, data)
  {
    if(typeof data !== 'boolean')
    {
      const msg = `Invalid type: "${typeof data}", boolean expected`
      throw new InvalidBooleanError(msg)
    }
  }
}

module.exports = ComposerValidatorBoolean
