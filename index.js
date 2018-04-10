module.exports =
{
  bootstrap : async function(config)
  {
    if(config.partials)
      if(typeof config.partials === 'object')
        for(let key in config.partials)
          await require('./view/template').addPartial(key, config.partials[key])
      else
        throw Error('"partials" is of an unsupported type')

    return this
  },

  http : function(routes)
  {
    const
    HttpServer  = require('./controller/server/http'),
    Router      = require('./controller/server/http/router'),
    router      = new Router(routes),
    server      = new HttpServer(router)

    return server.createServer()
  },

  https : function(routes, options)
  {
    const
    HttpsServer = require('./controller/server/https'),
    Router      = require('./controller/server/http/router'),
    router      = new Router(routes),
    server      = new HttpsServer(router, options)

    return server.createServer(options)
  },

  ws : function(routes, options)
  {
    const
    WsServer = require('./controller/server/ws'),
    Router   = require('./controller/server/ws/router'),
    router   = new Router(routes),
    server   = new WsServer(router)

    return server.createServer(options)
  }
}
