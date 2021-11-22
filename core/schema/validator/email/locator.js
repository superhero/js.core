const SchemaValidatorEmail = require('.')

class SchemaValidatorEmailLocator
{
  locate()
  {
    return new SchemaValidatorEmail
  }
}

module.exports = SchemaValidatorEmailLocator
