const SchemaValidatorDecimal = require('.')

class SchemaValidatorDecimalLocator
{
  locate()
  {
    return new SchemaValidatorDecimal
  }
}

module.exports = SchemaValidatorDecimalLocator
