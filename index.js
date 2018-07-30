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
    const
    DeepMerge = require('./model/deep-merge'),
    deepmerge = new DeepMerge,
    // resolves the filename and returns if the script exists or not...
    resolve = (filename) =>
    {
      try
      {
        require.resolve(filename)
        return true
      }
      catch (err)
      {
        return false
      }
    },
    // load the module in a specified order
    load = async (path, options) =>
    {
      if(resolve(`${path}/config`))
      {
        const config = require(`${path}/config`)
        deepmerge.merge(this.config, config)
      }

      if(resolve(`${path}/bootstrap`))
      {
        const bootstrap = require(`${path}/bootstrap`)
        await bootstrap.call({ locator:this.locator }, options)
      }
    }

    for(const ns in collection)
    {
      let path

      // if one or the other file exists, then the module is valid
      if(resolve(`${ns}/bootstrap`)
      || resolve(`${ns}/config`))
      {
        path = ns
      }
      else if(resolve(`${this.config.mainDirectory}/${ns}/bootstrap`)
           || resolve(`${this.config.mainDirectory}/${ns}/config`))
      {
        path = `${this.config.mainDirectory}/${ns}`
      }
      else
      {
        const
        msg = `invalid component:"${ns}", missing expected bootstrap or config file`,
        err = new Error(message)

        err.code = 'ERR_INVALID_COMPONENT'

        throw err
      }

      await load(path, collection[ns])
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
