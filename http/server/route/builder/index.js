class HttpRouteBuilder
{
  constructor(deepmerge)
  {
    this.deepmerge = deepmerge
  }

  build(routes, request)
  {
    // TODO validate that "routes" is an object

    const
    validRoutes = this.fetchValidRoutes(routes, request),
    route       = this.deepmerge.merge({}, ...validRoutes)

    // TODO validate that the route has an endpoint

    route.dto = this.composeDto(request, route.dto)

    return route
  }

  fetchValidRoutes(routes, request)
  {
    const validRoutes = []
    for(const name in routes)
    {
      const
      route  = routes[name],
      action = route.action && new RegExp(`^${route.action}$`),
      method = route.method && new RegExp(`^${route.method}$`, 'i')

      if(request.url    .match(action)
      && request.method .match(method))
      {
        validRoutes.push(route)

        // once we found an endpoint, the route is completed
        if(route.endpoint)
          break
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
          case 'path':
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
            // TODO ...
            throw new ReferenceError(`type "${type}" is not recognized for request mapping`)
          }
        }

    return dto
  }
}

module.exports = HttpRouteBuilder
