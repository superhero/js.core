module.exports = class
{
  constructor(routes)
  {
    this.routes = routes
  }

  // @todo: sort this mess out, wider support for different router validaters,
  // seperate in classes
  findRoutes(request)
  {
    const routes = []

    for(const route of this.routes)
    {
      let path, method

      if(route.policy instanceof RegExp
      || typeof route.policy == 'string')
      {
        path = route.policy
      }
      else if(route.policy instanceof Object)
      {
        if('path' in route.policy)
          path = route.policy.path

        if('method' in route.policy)
          method = route.policy.method
      }

      if(!path && !method)
      {
        routes.push(route)
        continue
      }

      if(path)
      {
        path = path instanceof RegExp
             ? path
             : new RegExp(`^${path}$`)

        if(!request.url.pathname.match(path))
          continue
      }

      if(method)
      {
        method = method instanceof RegExp
               ? method
               : new RegExp(`^${method}$`, 'i')

        if(!request.method.match(method))
          continue
      }

      routes.push(route)
    }

    return routes
  }

  findRoute(request)
  {
    const
    routes = this.findRoutes(request),
    route  = this.flattenRoutes(routes)

    return route
  }

  flattenRoutes(routes)
  {
    const
    origin = { middleware:[] },
    extend = this.extendRoute.bind(this),
    route  = routes.reduce(extend, origin)

    return route
  }

  extendRoute(origin, item)
  {
    const route = Object.assign({}, origin, item)

    if(item.middleware)
      route.middleware = origin.middleware.concat(item.middleware)

    return route
  }
}
