const NoEndpointDefinedInRouteError = require('./error/no-endpoint-defined-in-route')

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
      switch(error.code)
      {
        case 'E_HTTP_DISPATCHER':
        {
          output.writeHead(error.status)
          output.end(error.message)
          break
        }
        case 'E_NO_ENDPOINT_DEFINED_IN_ROUTE':
        {
          this.eventbus.emit('core.error', error)

          output.writeHead(404)
          output.end('Not Found')
          break
        }
        default:
        {
          this.eventbus.emit('core.error', error)

          output.writeHead(500)
          output.end('Internal Server Error')
          break
        }
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
    viewModel   = this.createViewModel()

    if(!route.endpoint)
    {
      throw new NoEndpointDefinedInRouteError(`No endpoint defined in route for the request: ${request.method} -> ${request.url}`)
    }

    const dispatchers = await this.dispatcherCollectionBuilder.build(route, request, session, viewModel)
    await this.dispatcherChain.dispatch(dispatchers)

    const
    viewType    = viewModel.meta.view || route.view || 'http/server/view/json',
    view        = this.locator.locate(viewType)

    await view.write(output, viewModel, route)
  }

  /**
   * Allowing the body to be set, in order to be able to have arrays and strings as a response body
   * @returns {Object} frozen
   */
  createViewModel()
  {
    let body = {}

    const viewModel =
    {
      get body()
      {
        return body
      },
      set body(_body)
      {
        body = _body
      },
      headers : {},
      meta    : {}
    }

    return Object.freeze(viewModel)
  }
}

module.exports = HttpServer
