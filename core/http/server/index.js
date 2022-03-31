const ViewContractNotHoneredError = require('./error/view-contract-not-honered')

class HttpServer
{
  /**
   * @param {http.Server} server
   */
  constructor(server, requestBuilder, sessionBuilder, routeBuilder,
              dispatcherCollectionBuilder, dispatcherChain, configuration,
              locator, eventbus, domainFactory, decoder)
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
    this.decoder                      = decoder
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
    const
    domain  = this.domainFactory.create(),
    onError = this.onError.bind(this, input, output, domain)

    domain.add(input)
    domain.add(output)

    domain.on('error',    onError)
    input.on('aborted',   this.onAborted.bind(this, output))
    output.on('timeout',  this.onTimeout.bind(this, output))
    output.on('finish',   this.onFinish .bind(this, input, output, domain))

    domain.run(() => this.dispatch(input, output, domain).catch(onError))
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
      case 'E_HTTP_SERVER_ROUTE_BUILDER_INVALID_DTO':
      {
        this.eventbus.emit('core.warning', error)

        output.writeHead(400)
        output.end('Bad request: ' + error.message)

        break
      }
      case 'E_JSON_PARSE_ERROR':
      {
        this.eventbus.emit('core.warning', error)

        output.writeHead(400)
        output.end('Bad request: Invalid JSON format: ' + error.message)

        break
      }
      case 'E_HTTP_DISPATCHER':
      {
        this.eventbus.emit('core.warning', error)

        output.writeHead(error.status)
        output.end(error.message)

        break
      }
      case 'E_NO_ENDPOINT_DEFINED_IN_ROUTE':
      {
        this.eventbus.emit('core.error', error)

        output.writeHead(404)
        output.end('Endpoint not found')

        break
      }
      default:
      {
        this.eventbus.emit('core.error', error)

        output.writeHead(500)
        output.end('Internal server error')

        break
      }
    }
  }

  async dispatch(input, output, domain)
  {
    const
    routes    = this.configuration.find('core.http.server.routes'),
    session   = await this.sessionBuilder.build(input, output, domain),
    request   = await this.requestBuilder.build(input),
    route     = await this.routeBuilder.build(routes, request),
    viewModel = this.createViewModel(),
    decoded   = await this.decoder.decode(route, request, session, viewModel)
    
    this.routeBuilder.buildDto(decoded, route)

    const dispatchers = await this.dispatcherCollectionBuilder.build(route, request, session, viewModel)
    await this.dispatcherChain.dispatch(dispatchers)

    if(!output.finished)
    {
      const
        viewType  = viewModel.meta.status === 204 ? 'core/http/server/view/no-content' : viewModel.meta.view || route.view || 'core/http/server/view/json',
        view      = this.locator.locate(viewType)

      if(typeof view.write !== 'function')
      {
        const msg = `The service "${viewType}" does not honer the view contract`
        throw new ViewContractNotHoneredError(msg)
      }

      await view.write(output, viewModel, route)
    }
  }

  /**
   * Allowing the body to be set, in order to be able to have arrays and strings as a response body
   * @returns {Object}
   */
  createViewModel()
  {
    const viewModel =
    {
      body    : {},
      headers : {},
      meta    : {}
    }

    return viewModel
  }
}

module.exports = HttpServer
