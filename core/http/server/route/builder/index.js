const
RoutesInvalidTypeError  = require('./error/routes-invalid-type'),
InvalidRouteInputError  = require('./error/invalid-route-input'),
InvalidDtoError         = require('./error/invalid-dto')

class HttpRouteBuilder
{
  constructor(deepmerge, composer)
  {
    this.deepmerge  = deepmerge
    this.composer   = composer
  }

  build(routes, request)
  {
    if(typeof routes !== 'object')
    {
      const msg = 'routes must be built from an object'
      throw new RoutesInvalidTypeError(msg)
    }

    const
    validRoutes = this.fetchValidRoutes(routes, request),
    route       = this.deepmerge.merge({}, ...validRoutes)

    if(!('input' in route))
    {
      const msg = 'route requires a defintion of an input schema, "false" is an acceptable value'
      throw new InvalidRouteInputError(msg)
    }

    try
    {
      if(route.input)
      {
        route.dto = this.composeDto(request, route)
      }

      return route
    }
    catch(error)
    {
      throw new InvalidDtoError(error.message)
    }
  }

  fetchValidRoutes(routes, request)
  {
    const validRoutes = []
    for(const name in routes)
    {
      const
      route   = routes[name],
      url     = route.url     && new RegExp(`^${route.url.replace(/\/:(\w+)/g, '/.+').replace(/\/+$/g, '')}$`),
      method  = route.method  && new RegExp(`^${route.method}$`, 'i')

      if(request.url    .match(url)
      && request.method .match(method))
      {
        validRoutes.push(route)

        // once we found an endpoint, the route is completed
        if(route.endpoint)
        {
          break
        }
      }
    }
    return validRoutes
  }

  composeDto(request, route)
  {
    const dto = {}

    for(const key in request.query)
    {
      dto[key] = request.query[key]
    }

    for(const key in request.body)
    {
      dto[key] = request.body[key]
    }

    const
    requestUrl  = request.url.split('/'),
    routeUrl    = route.url.split('/')

    for(const i in routeUrl)
    {
      const segment = routeUrl[i]

      if(segment.startsWith(':'))
      {
        const key = segment.slice(1)
        dto[key] = requestUrl[i]
      }
    }

    return this.composer.compose(route.input, dto)
  }
}

module.exports = HttpRouteBuilder
