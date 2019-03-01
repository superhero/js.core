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
    deepmerge = this.locator.locate('deepmerge'),
    builder   = new ServerRouteBuilder(deepmerge)

    return builder
  }
}

module.exports = ServerRouteBuilderLocator
