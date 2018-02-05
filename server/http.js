const
url  = require('url'),
http = require('http')

module.exports = class extends require('./_abstract')
{
  constructor(router)
  {
    this.router = router
    this.server = http.createServer(this.io.bind(this))
  }

  listen(port)
  {
    this.server.listen(port)
  }

  io(in, out)
  {
    const request =
    {
      headers : in.headers,
      method  : in.method,
      url     : url.parse(in.url, true),
      body    : ''
    }

    in.on('data', (data) => request.body += data)
    in.on('end', this.dispatch.bind(this, out, request))
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

    let vm

    try
    {
      vm = await new Dispatcher(request, route).dispatch()
    }
    catch (error)
    {
      vm = { status : 500,
             body   :
             { dispatcher,
               status  : 'failed',
               message : 'unhandled exception' } }
    }
    
    const
    View    = await this.fetchView(vm.view || route.view),
    output  = await new View.compose(vm, route)

    out.writeHead(vm.status || 200, vm.headers)
    out.end(output)
  }

  async fetchDispatcher(dispatcher)
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
