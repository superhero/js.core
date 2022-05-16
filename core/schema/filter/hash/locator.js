const 
  SchemaFilterHash  = require('.'),
  crypto            = require('crypto')

class SchemaFilterHashLocator
{
  locate()
  {
    return new SchemaFilterHash(crypto)
  }
}

module.exports = SchemaFilterHashLocator
