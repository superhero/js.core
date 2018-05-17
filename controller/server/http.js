const
Debug       = require('@superhero/debug'),
domain      = require('domain'),
url         = require('url'),
http        = require('http'),
querystring = require('querystring'),
statusCodes = require('./http/status-codes')

module.exports = class
{
  constructor(options, router)
  {
    this.config = Object.assign({ prefix:'http server:' }, options)
    this.router = router
    this.debug  = new Debug(this.config)
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

  async dispatch(i, o)
  {
    const
    request = Object.freeze(await this.composeRequest(i)),
    input   = { path:request.url.pathname, method:request.method },
    route   = Object.freeze(await this.router.findRoute(input)),
    session = {}

    if(!route.endpoint)
      throw 404

    async function chain(Dispatcher)
    {
      const
      dispatcher = new Dispatcher(request, route, session),
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
    View      = require(this.config.view[view]),
    output    = await new View().compose(viewModel, route)

    o.writeHead(viewModel.status || 200, viewModel.headers)
    o.end(output)
  }

  async composeRequest(i)
  {
    return new Promise((resolve, reject) =>
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

            default:
              request.body = querystring.parse(request.body)
              break
          }

          resolve(request)
        }
        catch(error)
        {
          reject(400)
        }
      })
    })
  }
}
