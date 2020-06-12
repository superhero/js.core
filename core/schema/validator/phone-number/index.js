const InvalidPhoneNumberError = require('./error/invalid')
/**
 * @implements {SchemaValidator}
 */
class SchemaValidatorPhoneNumber
{
  valid(options, data)
  {
    if(typeof data !== 'string')
    {
      const msg = `Invalid type: "${typeof data}", string expected`
      throw new InvalidPhoneNumberError(msg)
    }

    const plusAppears = data.split('').reduce((count, char) => char === '+' ? ++count : count, 0)

    if(plusAppears > 1) 
    {
      const msg = `Unexpected character in phone number: "${data}"`
      throw new InvalidPhoneNumberError(msg)
    }

    if(plusAppears === 1 
    && data[0] !== '+') 
    {
      const msg = `Plus character only allowed once in the beginning of the phone number: "${data}"`
      throw new InvalidPhoneNumberError(msg)
    }

    if('min' in options
    && data.length < options.min)
    {
      const msg = `Phone numbers length must be minimum: "${options.min}"`
      throw new InvalidPhoneNumberError(msg)
    }

    if('max' in options
    && data.length > options.max)
    {
      const msg = `Phone numbers length can't be more than: "${options.max}"`
      throw new InvalidPhoneNumberError(msg)
    }

    if('gt' in options
    && data.length < options.gt)
    {
      const msg = `Phone numbers length must be more than: "${options.gt}"`
      throw new InvalidPhoneNumberError(msg)
    }

    if('lt' in options
    && data.length > options.lt)
    {
      const msg = `Phone numbers length must be less than: "${options.lt}"`
      throw new InvalidPhoneNumberError(msg)
    }

    if(options.enum
    &&!options.enum.includes(data))
    {
      const msg = `Expected one of the enumeral values: "${options.enum}"`
      throw new InvalidPhoneNumberError(msg)
    }
  }
}

module.exports = SchemaValidatorPhoneNumber
