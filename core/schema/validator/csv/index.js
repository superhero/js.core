const InvalidCsvError = require('./error/invalid')
/**
 * @implements {SchemaValidator}
 */
class SchemaValidatorCsv
{
  valid(options, data)
  {
    if(Array.isArray(data) === false)
    {
      const msg = `Invalid type: "${typeof data}", csv (comma seperated values) string expected`
      throw new InvalidCsvError(msg)
    }

    if(options['not-empty']
    &&!data.length)
    {
      const msg = `Must not be empty`
      throw new InvalidCsvError(msg)
    }

    if('min' in options
    && data.length < options.min)
    {
      const msg = `Length of values must be minimum: "${options.min}" long`
      throw new InvalidCsvError(msg)
    }

    if('max' in options
    && data.length > options.max)
    {
      const msg = `Length of values can't be more then: "${options.max}" long`
      throw new InvalidCsvError(msg)
    }

    if(options.enum
    &&!data.every((value) => options.enum.includes(value)))
    {
      const msg = `Expected all values of the csv to be one of the enumeral values: "${options.enum}"`
      throw new InvalidCsvError(msg)
    }

    if(options.uppercase
    &&!data.every((value) => value === data.toUpperCase()))
    {
      const msg = `Upper case string expected`
      throw new InvalidCsvError(msg)
    }

    if(options.lowercase
    &&!data.every((value) => value === data.toLowerCase()))
    {
      const msg = `Lower case string expected`
      throw new InvalidCsvError(msg)
    }
  }
}

module.exports = SchemaValidatorCsv
