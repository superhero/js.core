const ServerRequestBuilder = require('.')

class ServerRequestBuilderFactory
{
  constructor(locator)
  {
    this.locator = locator
  }

  create()
  {
    const
    deepfreeze            = this.locator.locate('deepfreeze'),
    serverRequestBuilder  = new ServerRequestBuilder(deepfreeze)

    return serverRequestBuilder
  }
}

module.exports = ServerRequestBuilderFactory
