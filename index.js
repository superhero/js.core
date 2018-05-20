module.exports =
{
  bootstrap : async function(tasks)
  {
    Array.isArray(tasks)
    ? tasks.forEach(async (task) => await this.bootstrap(task))
    : await tasks(config)

    return this
  },

  server : function(type, options)
  {
    const config = Object.assign({}, require('./config'), options)

    if(type in config.server)
    {
      const
      Locator = require('./model/service-locator'),
      Router  = require('./controller/router'),
      Server  = require(config.server[type]),
      locator = new Locator,
      router  = new Router(config, config.routes),
      server  = new Server(config, router, locator)

      locator.add('config', config)
      locator.addBatch(config.mainDirectory, config.locator)

      return server.createServer(config)
    }

    throw new Error(`Server:"${type}" is unspecified, was it bootstrapped?`)
  }
}
