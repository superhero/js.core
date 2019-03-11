const
RoutesInvalidTypeError    = require('./error/routes-invalid-type'),
DtoInvalidReferenceError  = require('./error/dto-invalid-reference')

class HttpRouteBuilder
{
  constructor(deepmerge)
  {
    this.deepmerge = deepmerge
  }

  build(routes, request)
  {
    if(typeof routes !== 'object')
    {
      throw new RoutesInvalidTypeError(`routes must be built from an object`)
    }

    const
    validRoutes = this.fetchValidRoutes(routes, request),
    route       = this.deepmerge.merge({}, ...validRoutes)

    route.dto = this.composeDto(request, route.dto)

    return route
  }

  fetchValidRoutes(routes, request)
  {
    const validRoutes = []
    for(const name in routes)
    {
      const
      route   = routes[name],
      url     = route.url     && new RegExp(`^${route.url}$`),
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

  composeDto(request, map)
  {
    const dto = {}
    for(const key in map)
      for(const type in map[key])
        switch(type)
        {
          case 'body':
          {
            const body_key = map[key][type]
            dto[key] = request.body[body_key]
            break
          }
          case 'url':
          {
            const url_index = parseInt(map[key][type])
            dto[key] = request.url.split('/')[url_index]
            break
          }
          case 'query':
          {
            const query_key = map[key][type]
            dto[key] = request.query[query_key]
            break
          }
          default:
          {
            throw new DtoInvalidReferenceError(`type "${type}" is not recognized for request to DTO mapping`)
          }
        }

    return dto
  }
}

module.exports = HttpRouteBuilder
