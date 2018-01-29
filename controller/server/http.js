const
url  = require('url'),
http = require('http')

module.exports = class extends require('./_abstract')
{
  constructor(router)
  {
    super()
    this.router = router
  }

  createServer()
  {
    if(!this.server)
      this.server = http.createServer(this.io.bind(this))
  }

  listen(port)
  {
    this.createServer()
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
    route      = await this.router.findRoute(request.url.pathname),
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

    const
    vm      = await new Dispatcher(request, route).dispatch(),
    View    = await this.fetchView(vm.view || route.view),
    output  = await new View().compose(vm, route)

    out.writeHead(vm.status || 200, vm.headers)
    out.end(output)
  }

  fetchDispatcher(dispatcher)
  {
    try
    {
      return super.fetchDispatcher(dispatcher)
    }
    catch(error)
    {
      return class
      {
        dispatch()
        {
          return { status : 500,
                   body   :
                   { dispatcher,
                     status  : 'failed',
                     message : error } }
        }
      }
    }
  }
}
