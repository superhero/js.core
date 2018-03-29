const
url  = require('url'),
http = require('http')

module.exports = class extends require('./_abstract')
{
  createServer()
  {
    if(!this.server)
      this.server = http.createServer(this.io.bind(this))
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
             body   : 'Internal Server Error' }
    }

    const
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
      dispatcher
      && console.log(dispatcher, require('util').inspect(error))

      return class
      {
        dispatch()
        {
          return dispatcher
          ? { status  : 500,
              body    : 'Internal Server Error' }
          : { status  : 404,
              body    : 'Not Found' }
        }
      }
    }
  }
}
