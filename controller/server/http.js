const
Debug   = require('@superhero/debug'),
domain  = require('domain'),
url     = require('url'),
http    = require('http'),
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

    context.add(i)
    context.add(o)
    context.run(() => this.dispatch(i, o))
  }

  async dispatch(i, o)
  {
    try
    {
      const
      request     = await this.composeRequest(i),
      route       = await this.router.findRoute(request),
      Dispatcher  = await fetchDispatcher(route.dispatcher),
      vm          = await new Dispatcher(request, route).dispatch(),
      View        = await fetchView(vm.view || route.view),
      output      = await new View().compose(vm, route)

      o.writeHead(vm.status || 200, vm.headers)
      o.end(output)
    }
    catch(error)
    {
      this.debug.error(502, 'Bad Gateway', error)

      o.setHeader('content-type', 'text/plain')
      o.writeHead(502)
      o.end('Bad Gateway')
    }
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
