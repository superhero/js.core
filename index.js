module.exports =
{
  http : (routes) =>
  {
    const
    HttpServer  = require('./controller/server/http'),
    Router      = require('./controller/server/http/router'),
    router      = new Router(routes),
    server      = new HttpServer(router)

    return server.createServer()
  },

  https : (routes, options) =>
  {
    const
    HttpsServer = require('./controller/server/https'),
    Router      = require('./controller/server/http/router'),
    router      = new Router(routes),
    server      = new HttpsServer(router, options)

    return server.createServer(options)
  },

  ws : (routes, options) =>
  {
    const
    WsServer = require('./controller/server/ws'),
    Router   = require('./controller/server/ws/router'),
    router   = new Router(routes),
    server   = new WsServer(router)

    return server.createServer(options)
  }
}
