const InvalidBooleanError = require('./error/invalid')
/**
 * @implements {SchemaValidator}
 */
class SchemaValidatorBoolean
{
  valid(options, data)
  {
    if(typeof data !== 'boolean')
    {
      const msg = `Invalid type: "${typeof data}", boolean expected`
      throw new InvalidBooleanError(msg)
    }
  }
}

module.exports = SchemaValidatorBoolean
