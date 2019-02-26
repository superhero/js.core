const ServerSessionBuilder = require('.')

class ServerSessionBuilderLocator
{
  locate()
  {
    return new ServerSessionBuilder
  }
}

module.exports = ServerSessionBuilderLocator
