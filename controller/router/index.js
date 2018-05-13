module.exports = class
{
  constructor(routes)
  {
    this.routes = routes
  }

  // @todo: sort this mess out, wider support for different router validaters,
  // seperate in classes
  findRoutes(input)
  {
    input = Object.assign(
    {
      path    : '',
      method  : ''
    }, input)

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
        // event is alias for path, for now - until we cleanup this module...
        if('event' in route.policy)
          path = route.policy.event

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

        if(!input.path.match(path))
          continue
      }

      if(method)
      {
        method = method instanceof RegExp
               ? method
               : new RegExp(`^${method}$`, 'i')

        if(!input.method.match(method))
          continue
      }

      routes.push(route)
    }

    return routes
  }

  findRoute(input)
  {
    const
    routes = this.findRoutes(input),
    route  = this.flattenRoutes(routes)

    return route
  }

  flattenRoutes(routes)
  {
    const
    origin = { chain:[] },
    extend = this.extendRoute.bind(this),
    route  = routes.reduce(extend, origin)

    return route
  }

  extendRoute(origin, item)
  {
    if(origin.endpoint)
      return origin

    const route = Object.assign({}, origin, item)

    if(item.chain)
      route.chain = origin.chain.concat(item.chain)

    return route
  }
}