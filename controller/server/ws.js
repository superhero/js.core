const Websocket = require('@superhero/websocket')

module.exports = class extends require('./_abstract')
{
  createServer(options)
  {
    if(!this.server)
    {
      this.server = new Websocket(this.options)
      this.server.events.emit = this.dispatch.bind(this)
    }
  }

  listen(port)
  {
    this.server.server.listen(port)
  }

  async dispatch(event, context, body)
  {
    const
    route       = await this.router.findRoute(event),
    Dispatcher  = await this.fetchDispatcher(route.dispatcher)

    new Dispatcher({event, context, body}, route).dispatch()
  }
}
