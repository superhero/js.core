const HttpServer = require('.')

class HttpServerLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    configuration               = this.locator.locate('configuration'),
    serverOptions               = configuration.find('http.server.options'),
    server                      = require('http').createServer(serverOptions),
    requestBuilder              = this.locator.locate('http/server/request/builder'),
    sessionFactory              = this.locator.locate('http/server/session/builder'),
    routeBuilder                = this.locator.locate('http/server/route/builder'),
    dispatcherCollectionBuilder = this.locator.locate('http/server/dispatcher/collection/builder'),
    dispatcherChain             = this.locator.locate('http/server/dispatcher/chain'),
    eventbus                    = this.locator.locate('eventbus'),
    domainFactory               = require('domain'),
    httpServer                  = new HttpServer(server, requestBuilder, sessionFactory, routeBuilder,
                                                 dispatcherCollectionBuilder, dispatcherChain, configuration,
                                                 this.locator, eventbus, domainFactory)

    server.timeout = configuration.find('http.server.timeout')
    server.on('request', httpServer.onRequest.bind(httpServer))

    return httpServer
  }
}

module.exports = HttpServerLocator
