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
      JSON.parse(data)
    }
    catch(error)
    {
      const msg = `Unparsable JSON provided`
      throw new InvalidJsonError(msg)
    }
  }
}

module.exports = ComposerValidatorJson
