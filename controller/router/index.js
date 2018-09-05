module.exports = class
{
  constructor(origin, routes)
  {
    this.origin = origin
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
               ? new RegExp(method, 'i')
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
    route  = this.composeRoute(routes)

    return route
  }

  composeRoute(routes)
  {
    const
    initial = { chain:[] },
    extend  = this.extendRoute.bind(this),
    route   = routes.reduce(extend, initial),
    chain   = route.endpoint
              ? route.chain.concat(route.endpoint)
              : route.chain

    route.dispatchers = this.fetchDispatchers(chain)

    return route
  }

  extendRoute(initial, item)
  {
    if(initial.endpoint)
      return initial

    if(item.chain)
      for(const middleware of [].concat(item.chain))
        if(!initial.chain.includes(middleware))
          initial.chain.push(middleware)

    item.args = item.args || {}

    const route = Object.assign({}, initial, item, { chain:initial.chain })
    return route
  }

  fetchDispatcher(dispatcher)
  {
    try
    {
      require.resolve(`${this.origin}/${dispatcher}`)
    }
    catch(error)
    {
      if(error.code === 'MODULE_NOT_FOUND')
        return require.main.require(dispatcher)

      else
        throw error
    }

    return require(`${this.origin}/${dispatcher}`)
  }

  fetchDispatchers(dispatchers)
  {
    const collection = []
    for(const dispatcher of dispatchers)
    {
      const Dispatcher = this.fetchDispatcher(dispatcher)
      collection.push(Dispatcher)
    }

    return collection
  }
}
