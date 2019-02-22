class ServerRouteBuilder
{
  constructor(deepfreeze, deepmerge, path)
  {
    this.deepfreeze = deepfreeze
    this.deepmerge  = deepmerge
    this.path       = path
  }

  build(routes, request, session, locator)
  {
    const
    filter          = this.filter.bind(this, request),
    filteredRoutes  = routes.filter(filter),
    route           = this.deepmerge.merge(...filteredRoutes)

    this.routeValidator.validate(route)
    this.composeRoute(route, request, session, locator)

    route.entity = this.composeEntity(request, map)

    return this.deepfreeze.freeze(route)
  }

  filter(request, route)
  {
    const
    action = route.action && new RegExp(`^${route.action}$`),
    method = route.method && new RegExp(`^${route.method}$`, 'i')

    if(request.url    .match(action)
    && request.method .match(method))
    {
      return true
    }
    else
    {
      return false
    }
  }

  composeRoute(route, request, session, locator)
  {
    route.endpoint = this.createDispatcher(route.endpoint, request, session, locator)

    for(const i in route.chain)
      route.chain[i] = this.createDispatcher(route.chain[i], request, session, locator)
  }

  createDispatcher(pathname, request, session, locator)
  {
    if(this.path.isResolvable(pathname))
    {
      const
      Dispatcher  = require(pathname),
      dispatcher  = new Dispatcher(request, session, locator)

      if(typeof dispatcher.dispatch !== 'function')
      {
        // TODO ...
        throw new Error('not honering server dispatcher contract')
      }

      return dispatcher
    }
    else
    {
      // TODO ...
      throw new ReferenceError(`dispatcher "${pathname}" can not be resolved`)
    }
  }

  composeEntity(request, map)
  {
    const entity = {}
    for(const key in map)
      for(const type in map[key])
        switch(type)
        {
          case 'body':
          {
            const body_key = map[key][type]
            entity[key] = request.body[body_key]
            break
          }

          case 'url':
          {
            const url_index = parseInt(map[key][type])
            entity[key] = request.url.split('/')[url_index]
            break
          }

          case 'query':
          {
            const query_key = map[key][type]
            entity[key] = request.query[query_key]
            break
          }
        }

    return entity
  }
}

module.exports = ServerRouteBuilder
