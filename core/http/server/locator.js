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
    configuration               = this.locator.locate('core/configuration'),
    serverOptions               = configuration.find('core.http.server.options'),
    server                      = require('http').createServer(serverOptions),
    requestBuilder              = this.locator.locate('core/http/server/request/builder'),
    sessionFactory              = this.locator.locate('core/http/server/session/builder'),
    routeBuilder                = this.locator.locate('core/http/server/route/builder'),
    dispatcherCollectionBuilder = this.locator.locate('core/http/server/dispatcher/collection/builder'),
    dispatcherChain             = this.locator.locate('core/http/server/dispatcher/chain'),
    eventbus                    = this.locator.locate('core/eventbus'),
    decoder                     = this.locator.locate('core/http/server/decoder'),
    domainFactory               = require('domain'),
    httpServer                  = new HttpServer(server, requestBuilder, sessionFactory, routeBuilder,
                                                 dispatcherCollectionBuilder, dispatcherChain, configuration,
                                                 this.locator, eventbus, domainFactory, decoder)

    server.timeout = configuration.find('core.http.server.timeout')
    server.on('request', httpServer.onRequest.bind(httpServer))

    return httpServer
  }
}

module.exports = HttpServerLocator
