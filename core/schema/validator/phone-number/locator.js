const SchemaValidatorPhoneNumber = require('.')

class SchemaValidatorPhoneNumberLocator
{
  locate()
  {
    return new SchemaValidatorPhoneNumber
  }
}

module.exports = SchemaValidatorPhoneNumberLocator
