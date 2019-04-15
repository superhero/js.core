const NoEndpointDefinedInRouteError = require('./error/no-endpoint-defined-in-route')

class HttpServer
{
  /**
   * @param {http.Server} server
   */
  constructor(server, requestBuilder, sessionBuilder, routeBuilder,
              dispatcherCollectionBuilder, dispatcherChain, configuration,
              locator, eventbus, domainFactory)
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
    this.domainFactory                = domainFactory
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

  onRequest(input, output)
  {
    const domain = this.domainFactory.create()

    domain.add(input)
    domain.add(output)

    domain.on('error', this.onError.bind(this, input, output, domain))
    input.on('aborted', this.onAborted.bind(this, output))
    output.on('timeout', this.onTimeout.bind(this, output))
    output.on('finish', this.onFinish .bind(this, input, output, domain))

    output.writeProcessing()

    domain.run(() => this.dispatch(input, output, domain))
  }

  onAborted(output)
  {
    output.end()
  }

  onFinish(input, output, domain)
  {
    let
    emitters = 0,
    timeouts = 0

    for(const member of domain.members)
      'removeAllListeners' in member
      ? emitters++
      : timeouts++

    if(domain.members.length > 2)
    {
      const msg =
      [
        `Finished session did not clear all domain members!`,
        `Expected: 2 (response and request)`,
        `Recieved: ${domain.members.length}`,
        `Emitters: ${emitters}`,
        `Timeouts: ${timeouts}`
      ].join('\n')

      this.eventbus.emit('core.warning', msg)
    }

    domain.exit()
    domain.removeAllListeners()
    input .removeAllListeners()
    output.removeAllListeners()
  }

  onTimeout(output)
  {
    output.writeHead(408)
    output.end('Request Timeout')
  }

  onError(input, output, domain, error)
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
        output.end('Endpoint Not Found')
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

  async dispatch(input, output, domain)
  {
    const
    routes    = this.configuration.find('http.server.routes'),
    session   = await this.sessionBuilder.build(input, output, domain),
    request   = await this.requestBuilder.build(input),
    route     = await this.routeBuilder.build(routes, request),
    viewModel = this.createViewModel()

    if(!route.endpoint)
    {
      const msg = `No endpoint defined in route for the request: ${request.method} -> ${request.url}`
      throw new NoEndpointDefinedInRouteError(msg)
    }

    const dispatchers = await this.dispatcherCollectionBuilder.build(route, request, session, viewModel)
    await this.dispatcherChain.dispatch(dispatchers)

    if(!output.finished)
    {
      output.writeProcessing()

      const
      viewType  = viewModel.meta.view || route.view || 'http/server/view',
      view      = this.locator.locate(viewType)

      await view.write(output, viewModel, route)
    }
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
