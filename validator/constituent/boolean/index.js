const InvalidBooleanError = require('./error/invalid')
/**
 * @implements {ValidatorConstituent}
 */
class ValidatorConstituentBoolean
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
      const msg = `Boolean must be a collection`
      throw new InvalidBooleanError(msg)
    }

    for(const item of data)
      this.validSingle(options, item)
  }

  validSingle(options, data)
  {
    if(typeof data !== 'boolean')
    {
      const msg = `Invalid type: "${data}", must be a boolean`
      throw new InvalidBooleanError(msg)
    }
  }
}

module.exports = ValidatorConstituentBoolean
