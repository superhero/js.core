module.exports =
{
  http : (routes) =>
  {
    const
    HttpServer  = require('./server/http'),
    Router      = require('./router'),
    router      = new Router(routes),
    server      = new HttpServer(router)

    return server;
  },

  https : (routes, options) =>
  {
    const
    HttpsServer = require('./server/https'),
    Router      = require('./router'),
    router      = new Router(routes),
    server      = new HttpsServer(router, options)

    return server;
  }
}
