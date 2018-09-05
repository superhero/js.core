const log = require('@superhero/debug').log

module.exports = class
{
  constructor(config = {})
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
      if(isResolvable(`${this.config.mainDirectory}/${locator[key]}`))
      {
        const service = require(`${this.config.mainDirectory}/${locator[key]}`)
        this._locator.set(key, service)
      }
      else if(isResolvable(locator[key]))
      {
        const service = require(locator[key])
        this._locator.set(key, service)
      }
      else
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
    // load the module in a specified order
    load =
    {
      modules : {},
      mergeConfig : async (path) =>
      {
        if(isResolvable(`${path}/config`))
        {
          const config = require(`${path}/config`)
          deepmerge.merge(this.config, config)

          log(`Merged config:"${path}"`)
        }
      },
      bootstrap : async (path) =>
      {
        if(isResolvable(`${path}/bootstrap`))
        {
          const bootstrap = require(`${path}/bootstrap`)
          await bootstrap.call({ locator:this.locator }, load.modules[path])

          log(`Bootstraped:"${path}"`)
        }
      }
    }

    for(const ns in collection)
    {
      let path

      // if one or the other file exists, then the module is valid

      if(isResolvable(`${this.config.mainDirectory}/${ns}/bootstrap`)
      || isResolvable(`${this.config.mainDirectory}/${ns}/config`))
      {
        path = `${this.config.mainDirectory}/${ns}`
      }
      else if(isResolvable(`${ns}/bootstrap`)
           || isResolvable(`${ns}/config`))
      {
        path = ns
      }
      else
      {
        const
        msg = `invalid component:"${ns}" (missing expected bootstrap or config `
            + `file) path:"${this.config.mainDirectory}"`,
        err = new Error(msg)

        err.code = 'ERR_INVALID_COMPONENT'

        throw err
      }

      load.modules[path] = collection[ns]
    }

    // first merge the modules to prevent the bootstrap from opt out any
    // configuration for the locator

    for(const path in load.modules)
      await load.mergeConfig(path)

    log('Merged config:', this.config)

    for(const path in load.modules)
      await load.bootstrap(path)

    return this
  }

  server(type, routes, options)
  {
    if(type in this.config.server)
    {
      const
      Router = require('./controller/router'),
      Server = require(this.config.server[type]),
      router = new Router(this.config.mainDirectory, routes),
      server = new Server(this.config, router, this.locator)

      return server.createServer(options)
    }

    throw new Error(`Server:"${type}" is unspecified, was it bootstrapped?`)
  }
}

// resolves the filename and returns if the module exists or not...
function isResolvable(filename)
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
}
