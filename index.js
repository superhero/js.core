const config = require('./config')

module.exports =
{
  http : function(routes, options = {})
  {
    options = Object.assign({}, config, options)

    const
    Http    = require('./controller/server/http'),
    Router  = require('./controller/router'),
    router  = new Router(routes),
    http    = new Http(router, options),
    server  = http.createServer()

    return server
  },

  https : function(routes, options = {})
  {
    options = Object.assign({}, config, options)

    const
    Https   = require('./controller/server/https'),
    Router  = require('./controller/router'),
    router  = new Router(routes),
    https   = new Https(router, options),
    server  = https.createServer(options)

    return server
  },

  ws : function(routes, options = {})
  {
    options = Object.assign({}, config, options)

    const
    Websocket = require('./controller/server/ws'),
    Router    = require('./controller/router'),
    router    = new Router(routes),
    websocket = new Websocket(router, options),
    server    = websocket.createServer(options)

    return server
  },

  bootstrap : async function(tasks)
  {
    Array.isArray(tasks)
    ? tasks.forEach(async (task) => await this.bootstrap(task))
    : await tasks(config)

    return this
  }
}
