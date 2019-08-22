const SchemaValidatorString = require('.')

class SchemaValidatorStringLocator
{
  locate()
  {
    return new SchemaValidatorString
  }
}

module.exports = SchemaValidatorStringLocator
