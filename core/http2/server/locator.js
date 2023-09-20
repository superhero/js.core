const 
  Http2Server = require('.'),
  http2       = require('http2')

class HttpServerLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
      configuration = this.locator.locate('core/configuration'),
      router        = configuration.find('core/http2/server/router'),
      gateway       = configuration.find('core/http2/server/gateway'),
      server        = http2.createServer(gateway),
      httpServer    = new Http2Server(router, server, this.locator)

    return httpServer
  }
}

module.exports = HttpServerLocator
