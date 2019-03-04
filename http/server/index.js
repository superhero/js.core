class HttpServer
{
  /**
   * @param {http.Server} server
   */
  constructor(server, requestBuilder, sessionBuilder, routeBuilder,
              dispatcherCollectionBuilder, dispatcherChain, configuration,
              locator, eventbus)
  {
    this.server                       = server
    this.requestBuilder               = requestBuilder
    this.sessionBuilder               = sessionBuilder
    this.routeBuilder                 = routeBuilder
    this.dispatcherCollectionBuilder  = dispatcherCollectionBuilder
    this.dispatcherChain              = dispatcherChain
    this.configuration                = configuration
    this.locator                      = locator
    this.eventbus                     = eventbus
  }

  listen(...args)
  {
    this.server.listen(...args)
  }

  onListening(done)
  {
    return this.server.listening
    ? done()
    : this.server.once('listening', done)
  }

  close()
  {
    return new Promise((accept, reject) =>
      this.server.close((error) =>
        error
        ? reject(error)
        : accept()))
  }

  async onRequest(input, output)
  {
    try
    {
      await this.dispatch(input, output)
    }
    catch(error)
    {
      if(error.code === 'HTTP_DISPATCHER_ERROR')
      {
        output.writeHead(error.status)
        output.end(error.message)
      }
      else
      {
        this.eventbus.emit('core.error', error)

        output.writeHead(500)
        output.end('Internal Server Error')
      }
    }
  }

  async dispatch(input, output)
  {
    const
    routes      = this.configuration.find('http.server.routes'),
    session     = await this.sessionBuilder.build(input, output),
    request     = await this.requestBuilder.build(input),
    route       = await this.routeBuilder.build(routes, request, session),
    viewModel   = this.createViewModel(),
    dispatchers = await this.dispatcherCollectionBuilder.build(route, request, session, viewModel)

    await this.dispatcherChain.dispatch(dispatchers)

    const
    viewType    = viewModel.meta.view || route.view || 'http/server/view/json',
    view        = this.locator.locate(viewType)

    await view.write(output, viewModel, route)
  }

  createViewModel()
  {
    const viewModel = { body:{}, headers:{}, meta:{} }
    return Object.freeze(viewModel)
  }
}

module.exports = HttpServer
