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

  close()
  {
    return new Promise((accept, reject) =>
      this.server.close((error) =>
        error
        ? reject(error)
        : accept()))
  }

  async dispatch(input, output)
  {
    const
    routes    = this.locator.locate('configuration').config.server.http.routes,
    session   = await this.sessionBuilder.build(input, output),
    request   = await this.requestBuilder.build(input),
    route     = await this.routeBuilder.build(routes, request, session, this.locator),
    viewModel = await this.dispatcherChain.dispatch(),
    viewType  = viewModel.view || route.view || 'view.json',
    View      = this.locator.locate(viewType),
    view      = new View(output)

    await view.write(viewModel, route)
  }
}

module.exports = ServerHttp
