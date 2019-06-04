const SchemaValidatorBoolean = require('.')

class SchemaValidatorBooleanLocator
{
  locate()
  {
    return new SchemaValidatorBoolean
  }
}

module.exports = SchemaValidatorBooleanLocator
