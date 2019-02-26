class ServerRouteBuilder
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

    route.dto = this.composeDto(request, route.dto)

    return route
  }

  fetchValidRoutes(routes, request)
  {
    const output = []
    for(const name in routes)
    {
      const
      action = routes[name].action && new RegExp(`^${routes[name].action}$`),
      method = routes[name].method && new RegExp(`^${routes[name].method}$`, 'i')

      if(request.url    .match(action)
      && request.method .match(method))
      {
        output.push(routes[name])
      }
    }
    return output
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
            // TODO ...
            throw new ReferenceError(`type "${type}" is not recognized for request mapping`)
          }
        }

    return dto
  }
}

module.exports = ServerRouteBuilder
