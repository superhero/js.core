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
      Locator = require('./model/service-locator'),
      Router  = require('./controller/router'),
      Server  = require(config.server[type]),
      locator = new Locator,
      router  = new Router(options, routes),
      server  = new Server(options, router, locator)

      locator.addBatch(options.mainDirectory, options.locator)

      return server.createServer(options)
    }

    throw new Error(`Server:"${type}" is unspecified, was it bootstrapped?`)
  }
}
