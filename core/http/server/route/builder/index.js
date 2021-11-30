const
DtoBuilderContractNotHoneredError = require('./error/dto-builder-contract-not-honered'),
RoutesInvalidTypeError            = require('./error/routes-invalid-type'),
InvalidRouteInputError            = require('./error/invalid-route-input'),
InvalidDtoError                   = require('./error/invalid-dto'),
NoRouteFoundError                 = require('./error/no-route-found'),
NoEndpointDefinedError            = require('./error/no-endpoint-defined'),
InvalidRouteError                 = require('./error/invalid-route')

class HttpServerRouteBuilder
{
  constructor(deepmerge, deepclone, composer, object)
  {
    this.dtoBuilders  = []
    this.deepmerge    = deepmerge
    this.deepclone    = deepclone
    this.composer     = composer
    this.object       = object
  }

  /**
   * @param {Array} routes
   * @param {Object} request
   */
  async build(routes, request, locator)
  {
    if(typeof routes !== 'object')
    {
      const msg = 'routes must be built from an object'
      throw new RoutesInvalidTypeError(msg)
    }

    const
    validRoutes       = this.fetchValidRoutes(routes, request),
    validRoutesClone  = this.deepclone.clone(validRoutes),
    route             = this.deepmerge.merge({}, ...validRoutesClone)

    if(!validRoutesClone.length)
    {
      const msg = `Could not find a matching route for the request: ${request.method} -> ${request.url}`
      throw new NoRouteFoundError(msg)
    }

    if(!route.endpoint)
    {
      const msg = `No endpoint defined in route for the request: ${request.method} -> ${request.url}`
      throw new NoEndpointDefinedError(msg)
    }

    if('input' in route === false)
    {
      const msg = `route requires a defintion of an input schema, "false" is an acceptable value: ${request.method} -> ${request.url}`
      throw new InvalidRouteInputError(msg)
    }

    let decodedRequest = request

    if('decoder' in route)
    {
      let decoder
      try 
      {
        decoder = locator.locate(route.decoder)
      } 
      catch (error) 
      {
        const msg = `the decoder service: ${route.decoder} cannot be located`
        throw new InvalidDecoderError(msg)
      }
      try 
      {
        decodedRequest = await decoder.decode(request)
      } 
      catch (error) 
      {
        throw new FailedToDecodeError(error.message)
      }
    }

    try
    {
      if(route.input)
      {
        route.dto = this.composeDto(decodedRequest, route)
      }

      return route
    }
    catch(error)
    {
      throw new InvalidDtoError(error.message)
    }
  }

  /**
   * @param {Array} routes
   * @param {Object} request
   */
  fetchValidRoutes(routes, request)
  {
    const validRoutes = []

    for(const name in routes)
    {
      const
      route   = routes[name],
      url     = route.url     && new RegExp(`^${route.url.split('/').map(this.mapSegments).join('/').replace(/\/+$/g, '')}$`),
      method  = route.method  && new RegExp(`^${route.method}$`, 'i')

      if(request.url    .match(url)
      && request.method .match(method))
      {
        if(route.headers)
        {
          if(typeof route.headers !== 'object')
          {
            const msg = `the route headers must be of type object, found: ${typeof route.headers}, in route: ${name}`
            throw new InvalidRouteError(msg)
          }

          // validate that all headers match
          const 
          requestHeaders = this.object.composeLowerCaseKeyedObject(request.headers),
          routeHeaders   = this.object.composeLowerCaseKeyedObject(route.headers),
          isHeadersValid = Object.keys(routeHeaders).every((header) =>
          {
            const headerRegExp = new RegExp(`^${routeHeaders[header]}$`, 'i')

            if(header in requestHeaders
            && requestHeaders[header].match(headerRegExp))
            {
              return true
            }
          })

          if(isHeadersValid)
          {
            validRoutes.push(route)

            // when an endpoint has been found, the route is terminated
            if(route.endpoint)
            {
              return validRoutes
            }
          }
        }
        else
        {
          validRoutes.push(route)

          // when an endpoint has been found, the route is terminated
          if(route.endpoint)
          {
            return validRoutes
          }
        }
      }
    }

    return validRoutes
  }

  /**
   * @private
   * @param {string} segment
   */
  mapSegments(segment)
  {
    if(segment.startsWith(':'))
    {
      if(segment.includes('='))
      {
        return segment.split('=').pop()
      }
      else
      {
        return '[^/]+'
      }
    }
    else
    {
      return segment
    }
  }

  /**
   * @param {HttpServerRouteBuilderDtoBuilder} dtoBuilder
   */
  addDtoBuilder(dtoBuilder)
  {
    if(typeof dtoBuilder.build !== 'function')
    {
      const msg = 'Expected "dtoBuilder" to have a build function'
      throw new DtoBuilderContractNotHoneredError(msg)
    }

    return this.dtoBuilders.push(dtoBuilder)
  }

  /**
   * @param {number} index
   */
  removeDtoBuilder(index)
  {
    return delete this.dtoBuilders[index - 1]
  }

  /**
   * @param {Object} request
   * @param {Object} route
   */
  composeDto(request, route)
  {
    const dto = {}

    for(const index in this.dtoBuilders)
    {
      const dtoBuilder = this.dtoBuilders[index]
      dtoBuilder.build(dto, route, request)
    }

    return this.composer.compose(route.input, dto)
  }
}

module.exports = HttpServerRouteBuilder
