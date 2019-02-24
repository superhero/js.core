const ServerRequestBuilder = require('.')

class ServerRequestBuilderLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    deepfreeze            = this.locator.locate('deepfreeze'),
    serverRequestBuilder  = new ServerRequestBuilder(deepfreeze)

    return serverRequestBuilder
  }
}

module.exports = ServerRequestBuilderLocator
