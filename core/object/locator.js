const CoreObject = require('.')

class CoreObjectLocator
{
  locate()
  {
    return new CoreObject
  }
}

module.exports = CoreObjectLocator
