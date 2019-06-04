const SchemaValidatorSchema = require('.')

class SchemaValidatorSchemaLocator
{
  locate()
  {
    return new SchemaValidatorSchema
  }
}

module.exports = SchemaValidatorSchemaLocator
