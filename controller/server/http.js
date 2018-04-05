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
    if(!this.server)
      this.server = http.createServer((i, o) =>
      {
        const context = domain.create()

        context.on('error', (error) =>
        {
          this.debug.error(i.headers, i.url, error)
          try
          {
            o.statusCode = 500
            o.setHeader('content-type', 'text/plain')
            o.end('Internal Server Error')
          }
          catch(ffs)
          {
            this.debug.error(ffs)
          }
        })
        context.add(i)
        context.add(o)
        context.run(() => this.io(i, o))
      })
  }

  listen(port)
  {
    this.server.listen(port)
  }

  io(i, o)
  {
    const request =
    {
      headers : i.headers,
      method  : i.method,
      url     : url.parse(i.url, true),
      body    : ''
    }

    i.on('data', (data) => request.body += data)
    i.on('end', this.dispatch.bind(this, o, request))
  }

  async dispatch(out, request)
  {
    const
    route      = await this.router.findRoute(request),
    Dispatcher = await this.fetchDispatcher(route.dispatcher)

    switch(request.headers['content-type'])
    {
      case 'application/json':
        request.body = JSON.parse(request.body)
        break

      default:
        request.body = require('querystring').parse(request.body)
        break
    }

    let vm

    try
    {
      vm = await new Dispatcher(request, route).dispatch()
    }
    catch (error)
    {
      this.debug.error('dispatcher error:',   error,
                                  'route:',   route,
                                  'request:', request)

      vm = { view   : 'raw',
             status : 500,
             body   : 'Internal Server Error' }
    }

    const
    View    = await fetchView(vm.view || route.view),
    output  = await new View().compose(vm, route)

    out.writeHead(vm.status || 200, vm.headers)
    out.end(output)
  }

  fetchDispatcher(dispatcher)
  {
    try
    {
      return fetchDispatcher(dispatcher)
    }
    catch(error)
    {
      dispatcher
      && this.debug.error(dispatcher, error)

      return class
      {
        dispatch()
        {
          return dispatcher
          ? { view    : 'raw',
              status  : 500,
              body    : 'Internal Server Error' }
          : { view    : 'raw',
              status  : 404,
              body    : 'Not Found' }
        }
      }
    }
  }
}
