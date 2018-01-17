const Websocket = require('@superhero/websocket')

module.exports = class extends require('./_abstract')
{
  constructor(router, options)
  {
    this.router = router
    this.server = new Websocket(options)
    this.server.events.emit = this.dispatch.bind(this)
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
