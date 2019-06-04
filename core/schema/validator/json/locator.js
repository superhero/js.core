const SchemaValidatorJson = require('.')

class SchemaValidatorJsonLocator
{
  locate()
  {
    return new SchemaValidatorJson
  }
}

module.exports = SchemaValidatorJsonLocator
