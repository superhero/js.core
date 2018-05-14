const config = require('./config')

module.exports =
{
  bootstrap : async function(tasks)
  {
    Array.isArray(tasks)
    ? tasks.forEach(async (task) => await this.bootstrap(task))
    : await tasks(config)

    return this
  },

  server : function(type, routes, options = {})
  {
    if(type in config.server)
    {
      options = Object.assign({}, config, options)

      const
      Server  = require(config.server[type]),
      Router  = require('./controller/router'),
      router  = new Router(options, routes),
      server  = new Server(options, router)

      return server.createServer()
    }

    throw new Error(`Server:"${type}" is unspecified, was it bootstrapped?`)
  }
}
