const
Debug             = require('@superhero/debug'),
Websocket         = require('@superhero/websocket'),
fetchDispatchers  = require('./trait/fetch-dispatchers')

// this is still experimental, untested...
module.exports = class
{
  constructor(router, debug)
  {
    this.router = router
    this.debug  = new Debug({ debug, prefix:'websocket server:' })
  }

  createServer(options)
  {
    const ws = new Websocket(options)
    ws.events.emit = this.dispatch.bind(this)
    return ws.server
  }

  async dispatch(event, context, data)
  {
    const
    request = Object.freeze({ name:event, data }),
    input   = { path:event },
    route   = Object.freeze(await this.router.findRoute(input)),
    session = {}

    if(!route.endpoint)
    {
      this.debug.log('event:', event, 'error:', 'endpoint not found')
      context.emit('error', 'endpoint not found')
      return
    }

    function * chain(Dispatcher)
    {
      const dispatcher = new Dispatcher(request, route, session)
      for(const [event, data, toAll] of dispatcher.dispatch(dispatch))
        yield [event, data, toAll]
    }

    function * dispatch()
    {
      if(dispatchers.length)
      {
        const dispatcher = dispatchers.shift()
        for(const [event, data, toAll] of chain(dispatcher))
          yield [event, data, toAll]
      }
    }

    const
    list        = route.chain.concat(route.endpoint),
    dispatchers = await fetchDispatchers(list)

    try
    {
      for(const [event, data, toAll] of dispatch())
        context.emit(event, data, toAll)
    }
    catch(error)
    {
      this.debug.log('event:', event, 'data:', data, 'error:', error)
      context.emit('error')
    }
  }
}
