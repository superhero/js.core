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
    configuration               = this.locator.locate('configuration'),
    serverOptions               = configuration.find('server.http.options'),
    server                      = require('http').createServer(serverOptions),
    requestBuilder              = this.locator.locate('server/request/builder'),
    sessionFactory              = this.locator.locate('server/session/builder'),
    routeBuilder                = this.locator.locate('server/route/builder'),
    dispatcherCollectionBuilder = this.locator.locate('server/dispatcher/collection/builder'),
    dispatcherChain             = this.locator.locate('server/dispatcher/chain'),
    eventbus                    = this.locator.locate('eventbus'),
    httpServer                  = new ServerHttp(server, requestBuilder, sessionFactory, routeBuilder,
                                                 dispatcherCollectionBuilder, dispatcherChain, configuration,
                                                 this.locator, eventbus)

    server.timeout = configuration.find('server.http.timeout')
    server.on('request', httpServer.onRequest.bind(httpServer))

    return httpServer
  }
}

module.exports = ServerHttpLocator
