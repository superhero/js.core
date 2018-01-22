module.exports =
{
  http : (routes) =>
  {
    const
    HttpServer  = require('./controller/server/http'),
    Router      = require('./controller/router'),
    router      = new Router(routes),
    server      = new HttpServer(router)

    return server;
  },

  https : (routes, options) =>
  {
    const
    HttpsServer = require('./controller/server/https'),
    Router      = require('./controller/router'),
    router      = new Router(routes),
    server      = new HttpsServer(router, options)

    return server;
  }
}
