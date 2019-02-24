const ServerSessionBuilder = require('.')

class ServerSessionBuilderLocator
{
  locate()
  {
    const serverSessionBuilder = new ServerSessionBuilder
    return serverSessionBuilder
  }
}

module.exports = ServerSessionBuilderLocator
