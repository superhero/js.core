const SchemaFilterTimestamp = require('.')

class SchemaFilterTimestampLocator
{
  locate()
  {
    return new SchemaFilterTimestamp
  }
}

module.exports = SchemaFilterTimestampLocator
