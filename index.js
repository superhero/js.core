module.exports =
{
  bootstrap : async function(config)
  {
    if('partials' in config)
    {
      const Template = require('./view/template')

      for(let key in config.partials)
        await Template.addPartial(key, config.partials[key])
    }

    if('resource' in config)
    {
      const Resource = require('./controller/resource')

      for(key in config.resource)
        switch(key)
        {
          case 'cache'  :
          case 'origin' : Resource[key] = config.resource[key]
        }
    }

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
