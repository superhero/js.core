const ServerRouteBuilder = require('.')

class ServerRouteBuilderFactory
{
  constructor(locator)
  {
    this.locator = locator
  }

  create()
  {
    const
    deepfreeze          = this.locator.locate('deepfreeze'),
    deepmerge           = this.locator.locate('deepmerge'),
    path                = this.locator.locate('path'),
    serverRouteBuilder  = new ServerRouteBuilder(deepfreeze, deepmerge, path)

    return serverRouteBuilder
  }
}

module.exports = ServerRouteBuilderFactory
