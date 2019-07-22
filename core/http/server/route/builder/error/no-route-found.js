class NoRouteFoundError extends Error
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_HTTP_SERVER_ROUTE_BUILDER_NO_ROUTE_FOUND'
  }
}

module.exports = NoRouteFoundError
