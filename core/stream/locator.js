const CoreStream = require('.')

class CoreStreamLocator
{
  locate()
  {
    return new CoreStream
  }
}

module.exports = CoreStreamLocator
