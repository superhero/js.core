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
    report  = {},
    domain  = this.domainFactory.create(),
    onError = this.onError.bind(this, input, output, domain, report)

    domain.add(input)
    domain.add(output)

    report['input.method']    = input.method
    report['input.url']       = input.url
    report['dispatch.chain']  = []

    input.on('aborted',  () => report['input.aborted']  ? report['input.aborted']  += 1 : report['input.aborted']  = 1)
    input.on('close',    () => report['input.close']    ? report['input.close']    += 1 : report['input.close']    = 1)
    input.on('end',      () => report['input.end']      ? report['input.end']      += 1 : report['input.end']      = 1)
    input.on('error',    () => report['input.error']    ? report['input.error']    += 1 : report['input.error']    = 1)
    input.on('pause',    () => report['input.pause']    ? report['input.pause']    += 1 : report['input.pause']    = 1)
    input.on('resume',   () => report['input.resume']   ? report['input.resume']   += 1 : report['input.resume']   = 1)

    output.on('close',   () => report['output.close']   ? report['output.close']   += 1 : report['output.close']   = 1)
    output.on('drain',   () => report['output.drain']   ? report['output.drain']   += 1 : report['output.drain']   = 1)
    output.on('error',   () => report['output.error']   ? report['output.error']   += 1 : report['output.error']   = 1)
    output.on('finish',  () => report['output.finish']  ? report['output.finish']  += 1 : report['output.finish']  = 1)
    output.on('pipe',    () => report['output.pipe']    ? report['output.pipe']    += 1 : report['output.pipe']    = 1)
    output.on('timeout', () => report['output.timeout'] ? report['output.timeout'] += 1 : report['output.timeout'] = 1)
    output.on('unpipe',  () => report['output.unpipe']  ? report['output.unpipe']  += 1 : report['output.unpipe']  = 1)

    domain.on('error',    onError)
    input.on('aborted',   this.onAborted.bind(this, output))
    output.on('timeout',  this.onTimeout.bind(this, output, domain, report))
    output.on('finish',   this.onFinish .bind(this, input, output, domain))

    domain.run(() => this.dispatch(input, output, domain, report).catch(onError))
  }

  onAborted(output)
  {
    output.end()
  }

  onFinish(input, output, domain)
  {
    domain.exit()
    domain.removeAllListeners()
    input .removeAllListeners()
    output.removeAllListeners()
  }

  onTimeout(output, domain, report)
  {
    this.locator.locate('core/console').color('red').log('✗ server timeout', report)
    output.writeHead(408)
    output.end('Request Timeout')
  }

  onError(input, output, domain, report, error)
  {
    report['domain.error'] ? report['domain.error'] += 1 : report['domain.error'] = 1

    try
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
    catch(error)
    {
      switch(error.code)
      {
        case 'ERR_HTTP_HEADERS_SENT':
        {
          this.eventbus.emit('core.warning', error)
          break
        }
        default:
        {
          throw error
        }
      }
    }
  }

  async dispatch(input, output, domain, report)
  {
    const
    routes    = this.configuration.find('core.http.server.routes'),
    viewModel = this.createViewModel(),
    session   = await this.sessionBuilder.build(input, output, domain, viewModel),
    request   = await this.requestBuilder.build(input),
    route     = await this.routeBuilder.build(routes, request),
    decoded   = await this.decoder.decode(route, request, session, viewModel)

    try
    {
      const dispatchers = await this.dispatcherCollectionBuilder.build(route, request, session, viewModel)

      let buildDtoErrorHandled
      try
      {
        this.routeBuilder.buildDto(decoded, route)
      }
      catch(error)
      {
        buildDtoErrorHandled = false
        for(const dispatcher of dispatchers)
        {
          try
          {
            await dispatcher.onError(error)
            buildDtoErrorHandled = true
            break
          }
          catch(errorOnError)
          {
            if(errorOnError.code === error.code)
            {
              continue
            }
            else
            {
              throw errorOnError
            }
          }
        }

        if(buildDtoErrorHandled === false)
        {
          throw error
        }
      }

      if(buildDtoErrorHandled === undefined)
      {
        await this.dispatcherChain.dispatch(dispatchers, report)
      }

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
    catch(previousError)
    {
      const error = new Error('failed to dispatch')
      error.code  = 'E_CORE_HTTP_SERVER_DISPATCH'
      error.chain = { viewModel, route, previousError }
      throw error
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
