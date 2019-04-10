const InvalidBooleanError = require('./error/invalid')
/**
 * @implements {ComposerValidator}
 */
class ComposerValidatorBoolean
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

module.exports = ComposerValidatorBoolean
