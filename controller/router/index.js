module.exports = class
{
  constructor(routes)
  {
    this.routes = routes
  }

  findRoute(key)
  {
    let _route = {}
    this.routes.some((route) =>
    {
      const policy = route.policy instanceof RegExp
                   ? route.policy
                   : new RegExp(`^${route.policy}$`)

      if(route.policy && !key.match(policy))
        return

      _route = Object.assign(_route, route)
      return !!route.policy
    })

    return _route
  }
}
