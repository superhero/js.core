class ServerHttp
{
  /**
   * @param {http.Server} server
   */
  constructor(server, requestBuilder, sessionBuilder, routeBuilder, dispatcherCollectionBuilder, dispatcherChain, locator)
  {
    this.server                       = server
    this.requestBuilder               = requestBuilder
    this.sessionBuilder               = sessionBuilder
    this.routeBuilder                 = routeBuilder
    this.dispatcherCollectionBuilder  = dispatcherCollectionBuilder
    this.dispatcherChain              = dispatcherChain
    this.locator                      = locator
  }

  listen(...args)
  {
    require('@superhero/debug').log('dispatcher', '1')
    this.server.listen(...args)
  }

  close()
  {
    require('@superhero/debug').log('dispatcher', 'close')
    return new Promise((accept, reject) =>
      this.server.close((error) =>
        error
        ? reject(error)
        : accept()))
  }

  async dispatch(input, output)
  {
    require('@superhero/debug').log('dispatcher', '2')
    const
    routes      = this.locator.locate('configuration').find('server.http.routes'),
    session     = await this.sessionBuilder.build(input, output),
    request     = await this.requestBuilder.build(input),
    route       = await this.routeBuilder.build(routes, request, session),
    dispatchers = await this.dispatcherCollectionBuilder.build(route, request, session),
    viewModel   = await this.dispatcherChain.dispatch(dispatchers),
    viewType    = viewModel.view || route.view || 'view/json',
    view        = this.locator.locate(viewType)

    await view.write(output, viewModel, route)
  }
}

module.exports = ServerHttp
