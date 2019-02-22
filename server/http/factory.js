const ServerHttp = require('.')

class ServerHttpFactory
{
  constructor(locator)
  {
    this.locator = locator
  }

  create()
  {
    const
    configuration   = this.locator.locate('configuration'),
    server          = require('http').createServer(configuration.config.server.http),
    deepfreeze      = this.locator.locate('deepfreeze'),
    requestBuilder  = this.locator.locate('server.request-builder'),
    sessionFactory  = this.locator.locate('server.session-factory'),
    routeBuilder    = this.locator.locate('server.route-builder'),
    dispatcherChain = this.locator.locate('server.dispatcher-chain'),
    httpServer      = new ServerHttp( server, deepfreeze, requestBuilder, sessionFactory, routeBuilder,
                                      dispatcherChain, this.locator )

    return httpServer
  }
}

module.exports = ServerHttpFactory
