const InvalidEmailError = require('./error/invalid')
/**
 * @implements {SchemaValidator}
 */
class SchemaValidatorEmail
{
  valid(options, data)
  {
    if(typeof data !== 'string')
    {
      const msg = `Invalid type: "${typeof data}", string expected`
      throw new InvalidEmailError(msg)
    }

    if(options['not-empty']
    && !data.length)
    {
      const msg = `Must not be empty`
      throw new InvalidEmailError(msg)
    }

    if(options.uppercase
    && data !== data.toUpperCase())
    {
      const msg = `Upper case string expected`
      throw new InvalidEmailError(msg)
    }

    if(options.lowercase
    && data !== data.toLowerCase())
    {
      const msg = `Lower case string expected`
      throw new InvalidEmailError(msg)
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!re.test(String(data))) 
    {
      const msg = `Not a valid email format`
      throw new InvalidEmailError(msg)
    }
  }
}

module.exports = SchemaValidatorEmail
