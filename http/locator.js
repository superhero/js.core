const
Request = require('@superhero/request'),
Http    = require('.')

class HttpLocator
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
    requestBuilder              = this.locator.locate('http/request/builder'),
    sessionFactory              = this.locator.locate('http/session/builder'),
    routeBuilder                = this.locator.locate('http/route/builder'),
    dispatcherCollectionBuilder = this.locator.locate('http/dispatcher/collection/builder'),
    dispatcherChain             = this.locator.locate('http/dispatcher/chain'),
    eventbus                    = this.locator.locate('eventbus'),
    request                     = new Request(),
    httpServer                  = new Http(server, requestBuilder, sessionFactory, routeBuilder,
                                           dispatcherCollectionBuilder, dispatcherChain, configuration,
                                           this.locator, eventbus, request)

    server.timeout = configuration.find('http.timeout')
    server.on('request', httpServer.onRequest.bind(httpServer))

    return httpServer
  }
}

module.exports = HttpLocator
