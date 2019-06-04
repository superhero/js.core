const SchemaValidatorInteger = require('.')

class SchemaValidatorIntegerLocator
{
  locate()
  {
    return new SchemaValidatorInteger
  }
}

module.exports = SchemaValidatorIntegerLocator
