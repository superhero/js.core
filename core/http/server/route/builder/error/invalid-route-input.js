class InvalidRouteInputError extends TypeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_HTTP_SERVER_ROUTE_BUILDER_INVALID_ROUTE_INPUT'
  }
}

module.exports = InvalidRouteInputError
