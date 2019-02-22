const ServerSessionBuilder = require('.')

class ServerSessionBuilderFactory
{
  create()
  {
    const serverSessionBuilder = new ServerSessionBuilder
    return serverSessionBuilder
  }
}

module.exports = ServerSessionBuilderFactory
