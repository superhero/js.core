module.exports = class
{
  constructor(config)
  {
    this.config = Object.assign({}, require('./config'), config)
  }

  get locator()
  {
    if(this._locator)
      return this._locator

    const
    origin  = this.config.mainDirectory,
    locator = this.config.locator,
    Locator = require('./model/service-locator')

    this._locator = new Locator
    this._locator.set('config', () => this.config)

    for(const key in this.config.locator)
      try
      {
        const service = require(locator[key])
        this._locator.set(key, service)
      }
      catch(err)
      {
        if(err.code !== 'MODULE_NOT_FOUND')
          throw err

        const service = require(origin + '/' + locator[key])
        this._locator.set(key, service)
      }

    return this._locator
  }

  async bootstrap(collection)
  {
    const origin = this.config.mainDirectory

    for(const ns in collection)
      try
      {
        const bootstrap = require(ns + '/bootstrap')
        await bootstrap.call({ locator:this.locator }, collection[ns])
      }
      catch(err)
      {
        if(err.code !== 'MODULE_NOT_FOUND')
          throw err

        const bootstrap = require(origin + '/' + ns + '/bootstrap')
        await bootstrap.call({ locator:this.locator }, collection[ns])
      }

    return this
  }

  server(type, routes, options)
  {
    if(type in this.config.server)
    {
      const
      Router  = require('./controller/router'),
      Server  = require(this.config.server[type]),
      router  = new Router(this.config.mainDirectory, routes),
      server  = new Server(this.config, router, this.locator)

      return server.createServer(options)
    }

    throw new Error(`Server:"${type}" is unspecified, was it bootstrapped?`)
  }
}
