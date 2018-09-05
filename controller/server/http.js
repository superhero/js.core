const
Debug       = require('@superhero/debug'),
domain      = require('domain'),
url         = require('url'),
http        = require('http'),
querystring = require('querystring'),
statusCodes = require('./http/status-codes'),
arg         = require('./http/arg'),
jwt         = require('jsonwebtoken')

module.exports = class
{
  constructor(options, router, locator)
  {
    this.config   = Object.assign({ prefix:'http server:' }, options)
    this.router   = router
    this.debug    = new Debug(this.config)
    this.locator  = locator
  }

  createServer()
  {
    return http.createServer(this.io.bind(this))
  }

  io(i, o)
  {
    const context = domain.create()

    context.on('error', (error) => this.onError(error, o))
    context.add(i)
    context.add(o)
    context.run(async () =>
    {
      try
      {
        await this.dispatch(i, o)
      }
      catch(error)
      {
        context.emit('error', error)
      }
    })
  }

  onError(error, o)
  {
    if(error in statusCodes)
    {
      o.writeHead(error)
      o.end(statusCodes[error])
    }
    else
    {
      this.debug.error(statusCodes[500], error)

      o.writeHead(500)
      o.end(statusCodes[500])
    }
  }

  async findRoute(request)
  {
    const
    input = { path:request.url.pathname, method:request.method },
    route = await this.router.findRoute(input)

    let _arg, _entity

    return Object.assign(
    {
      get arg()
      {
        return _arg
        ? _arg
        : _arg = arg.bind(route, request)
      },

      get entity()
      {
        if(!_entity)
        {
          _entity = {}
          for(const key in route.mapper)
            _entity[key] = arg.call(route, request, key)
        }

        return _entity
      }
    }, route)
  }

  async dispatch(i, o)
  {
    const
    session = {},
    request = Object.freeze(await this.composeRequest(i)),
    route   = Object.freeze(await this.findRoute(request)),
    locator = Object.freeze(this.locator)

    if(!route.endpoint)
      throw 404

    async function chain(Dispatcher)
    {
      const
      dispatcher = new Dispatcher(request, route, session, locator),
      viewModel  = await dispatcher.dispatch(dispatch)

      return viewModel
    }

    let n = 0
    async function dispatch()
    {
      if(n < route.dispatchers.length)
      {
        const viewModel = await chain(route.dispatchers[n++])
        return viewModel
      }
    }

    const
    viewModel = await dispatch(),
    view      = viewModel.view || route.view || 'json',
    View      = require(this.config.view[view])

    await new View(o).write(viewModel, route)
  }

  async composeRequest(i)
  {
    return new Promise((accept, reject) =>
    {
      const request =
      {
        headers : i.headers,
        method  : i.method,
        url     : url.parse(i.url, true),
        body    : ''
      }

      i.on('data', (data) => request.body += data)
      i.on('end', () =>
      {
        try
        {
          switch(request.headers['content-type'])
          {
            case 'application/json':
              request.body = JSON.parse(request.body || '{}')
              break

            case 'application/jwt':
              const dto = jwt.decode(request.body, { complete:true })
              request.meta      = dto.header
              request.body      = dto.payload
              request.signature = dto.signature
              request.verify    = jwt.verify.bind(null, request.body)
              break

            default:
              request.body = querystring.parse(request.body)
              break
          }

          accept(request)
        }
        catch(error)
        {
          this.debug.error(error)
          reject(400)
        }
      })
    })
  }
}
