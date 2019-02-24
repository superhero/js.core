const ServerHttp = require('.')

class ServerHttpLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    configuration   = this.locator.locate('configuration'),
    server          = require('http').createServer(configuration.config.server.http.options),
    deepfreeze      = this.locator.locate('deepfreeze'),
    requestBuilder  = this.locator.locate('server.request-builder'),
    sessionFactory  = this.locator.locate('server.session-builder'),
    routeBuilder    = this.locator.locate('server.route-builder'),
    dispatcherChain = this.locator.locate('server.dispatcher-chain'),
    httpServer      = new ServerHttp( server, deepfreeze, requestBuilder, sessionFactory, routeBuilder,
                                      dispatcherChain, this.locator )

    server.timeout = configuration.config.server.http.timeout

    return httpServer
  }
}

module.exports = ServerHttpLocator
