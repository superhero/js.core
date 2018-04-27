const
Debug   = require('@superhero/debug'),
domain  = require('domain'),
url     = require('url'),
http    = require('http'),
statusCodes     = require('./http/status-codes'),
fetchDispatcher = require('./trait/fetch-dispatcher'),
fetchView       = require('./trait/fetch-view')

module.exports = class
{
  constructor(router)
  {
    this.router = router
    this.debug  = new Debug
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
      this.debug.error(500, 'Internal Server Error', error)

      o.writeHead(500)
      o.end(statusCodes[500])
    }
  }

  async dispatch(i, o)
  {
    const
    request     = await this.composeRequest(i),
    route       = await this.router.findRoute(request)

    if(!route.dispatcher)
      throw 404

    const
    Dispatcher  = await fetchDispatcher(route.dispatcher),
    vm          = await new Dispatcher(request, route).dispatch(),
    View        = await fetchView(vm.view || route.view),
    output      = await new View().compose(vm, route)

    o.writeHead(vm.status || 200, vm.headers)
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
              request.body = require('querystring').parse(request.body)
              break
          }

          resolve(request)
        }
        catch(error)
        {
          reject(error)
        }
      })
    })
  }
}
