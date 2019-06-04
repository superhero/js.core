const SchemaFilterBoolean = require('.')

class SchemaFilterBooleanLocator
{
  locate()
  {
    return new SchemaFilterBoolean
  }
}

module.exports = SchemaFilterBooleanLocator
