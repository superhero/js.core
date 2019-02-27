const ServerError = require('../')

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
    try
    {
      const
      routes      = this.locator.locate('configuration').find('server.http.routes'),
      session     = await this.sessionBuilder.build(input, output),
      request     = await this.requestBuilder.build(input),
      route       = await this.routeBuilder.build(routes, request, session),
      viewModel   = this.createViewModel(),
      dispatchers = await this.dispatcherCollectionBuilder.build(route, request, session, viewModel)

      await this.dispatcherChain.dispatch(dispatchers)

      const
      viewType    = viewModel.view || route.view || 'view/json',
      view        = this.locator.locate(viewType)

      await view.write(output, viewModel, route)
    }
    catch(error)
    {
      if(error instanceof ServerError)
      {
        output.writeHead(error.code)
        output.end(error.message)
      }
      else
      {
        throw error
      }
    }
  }

  createViewModel()
  {
    const viewModel = { body:{}, headers:{}, meta:{} }
    return Object.freeze(viewModel)
  }
}

module.exports = ServerHttp
