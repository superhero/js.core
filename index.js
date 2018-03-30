module.exports =
{
  http : (routes) =>
  {
    const
    HttpServer  = require('./controller/server/http'),
    Router      = require('./controller/server/http/router'),
    router      = new Router(routes),
    server      = new HttpServer(router)

    server.createServer()
    return server;
  },

  https : (routes, options) =>
  {
    const
    HttpsServer = require('./controller/server/https'),
    Router      = require('./controller/server/http/router'),
    router      = new Router(routes),
    server      = new HttpsServer(router, options)

    server.createServer(options)
    return server;
  },

  ws : (routes, options) =>
  {
    const
    WsServer = require('./controller/server/ws'),
    Router   = require('./controller/server/ws/router'),
    router   = new Router(routes),
    server   = new WsServer(router)

    server.createServer(options)
    return server;
  }
}
