const InvalidSchemaError = require('./error/invalid')
/**
 * @implements {ComposerValidator}
 */
class ComposerValidatorSchema
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
      throw new InvalidSchemaError(msg)
    }

    for(const item of data)
      this.validSingle(options, item)
  }

  validSingle(options, data)
  {
    // nothing to validate
  }
}

module.exports = ComposerValidatorSchema
