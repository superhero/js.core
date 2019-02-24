const ServerRouteBuilder = require('.')

class ServerRouteBuilderLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    deepfreeze          = this.locator.locate('deepfreeze'),
    deepmerge           = this.locator.locate('deepmerge'),
    path                = this.locator.locate('path'),
    serverRouteBuilder  = new ServerRouteBuilder(deepfreeze, deepmerge, path)

    return serverRouteBuilder
  }
}

module.exports = ServerRouteBuilderLocator
