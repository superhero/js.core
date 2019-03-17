const InvalidStringError = require('./error/invalid')
/**
 * @implements {ValidatorConstituent}
 */
class ValidatorConstituentString
{
  valid(data)
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
        const msg = `String must be a collection`
        throw new InvalidStringError(msg)
      }

      for(const item of data)
        this.validSingle(options, item)
    }

    validSingle(options, data)
    {
      if(typeof data !== 'string')
      {
        const msg = `Invalid type: "${data}", must be a string`
        throw new InvalidStringError(msg)
      }

      if(options['not-empty'] && data.length)
      {
        const msg = `String must not be empty`
        throw new InvalidStringError(msg)
      }

      if('min' in options && data.length >= options.min)
      {
        const msg = `String length must be minimum "${options.min}" long`
        throw new InvalidStringError(msg)
      }

      if('max' in options && data.length <= options.max)
      {
        const msg = `String length can't be more then "${options.max}" long`
        throw new InvalidStringError(msg)
      }

      if(options.enum && !options.enum.includes(data))
      {
        const msg = `String must one of "${options.enum}"`
        throw new InvalidStringError(msg)
      }
    }
  }
}

module.exports = ValidatorConstituentString
