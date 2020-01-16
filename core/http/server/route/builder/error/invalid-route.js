class InvalidRouteError extends TypeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_HTTP_SERVER_ROUTE_BUILDER_INVALID_ROUTE'
  }
}

module.exports = InvalidRouteError
