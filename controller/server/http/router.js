module.exports = class
{
  constructor(routes)
  {
    this.routes = routes
  }

  // @todo: sort this mess out, wider support for different router validaters,
  // seperate in classes
  findRoute(request)
  {
    let _route = {}
    this.routes.some((route) =>
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
        _route = Object.assign(_route, route)
        return
      }

      if(path)
      {
        path = path instanceof RegExp
             ? path
             : new RegExp(`^${path}$`)

        if(!request.url.pathname.match(path))
          return
      }

      if(method)
      {
        method = method instanceof RegExp
               ? method
               : new RegExp(`^${method}$`, 'i')

        if(!request.method.match(method))
          return
      }

      _route = Object.assign(_route, route)
      return true
    })

    return _route
  }
}
