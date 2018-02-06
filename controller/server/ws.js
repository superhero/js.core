const Websocket = require('@superhero/websocket')

module.exports = class extends require('./_abstract')
{
  createServer(options)
  {
    if(!this.server)
    {
      this.server = new Websocket(options)
      this.server.events.emit = this.dispatch.bind(this)
    }
  }

  listen(port)
  {
    this.server.server.listen(port)
  }

  async dispatch(event, context, body)
  {
    try
    {
      const
      route       = await this.router.findRoute(event),
      Dispatcher  = await this.fetchDispatcher(route.dispatcher)

      try
      {
        new Dispatcher({event, context, body}, route).dispatch()
      }
      catch(error)
      {
        context.emit('error', error)
      }
    }
    catch(error)
    {
      // ...
    }
  }
}
