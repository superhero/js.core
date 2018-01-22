const Websocket = require('@superhero/websocket')

module.exports = class extends require('./_abstract')
{
  constructor(router, options)
  {
    super()

    this.router   = router
    this.options  = options
  }

  createServer()
  {
    if(!this.server)
    {
      this.server = new Websocket(this.options)
      this.server.events.emit = this.dispatch.bind(this)
    }
  }

  listen(port)
  {
    this.createServer()
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
