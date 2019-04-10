const InvalidJsonError = require('./error/invalid')
/**
 * @implements {ComposerValidator}
 */
class ComposerValidatorJson
{
  valid(options, data)
  {
    try
    {
      options.stringified
      ? JSON.parse(data)
      : JSON.stringify(data)
    }
    catch(error)
    {
      const msg = `Unparsable JSON provided`
      throw new InvalidJsonError(msg)
    }
  }
}

module.exports = ComposerValidatorJson
