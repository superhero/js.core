const SchemaValidatorHash = require('.')

class SchemaValidatorHashLocator
{
  locate()
  {
    return new SchemaValidatorHash
  }
}

module.exports = SchemaValidatorHashLocator
