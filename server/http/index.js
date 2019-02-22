class ServerHttp
{
  /**
   * @param {http.Server} server
   */
  constructor(server, deepfreeze, requestBuilder, sessionBuilder, routeBuilder, dispatcherChain, locator)
  {
    this.server           = server
    this.deepfreeze       = deepfreeze
    this.sessionBuilder   = sessionBuilder
    this.requestBuilder   = requestBuilder
    this.routeBuilder     = routeBuilder
    this.dispatcherChain  = dispatcherChain
    this.locator          = locator
  }

  listen(...args)
  {
    this.server.listen(...args)
  }

  async dispatch(in, out)
  {
    const
    routes    = this.locator.locate('configuration').config.server.http.routes,
    session   = await this.sessionBuilder.build(in, out),
    request   = await this.requestBuilder.build(in),
    route     = await this.routeBuilder.build(routes, request, session, this.locator),
    viewModel = await this.dispatcherChain.dispatch(),
    viewType  = viewModel.view || route.view || 'view.json',
    View      = this.locator.locate(viewType),
    view      = new View(out)

    await view.write(viewModel, route)
  }
}

module.exports = ServerHttp
