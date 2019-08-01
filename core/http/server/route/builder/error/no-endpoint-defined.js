class NoEndpointDefinedInRouteError extends Error
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_NO_ENDPOINT_DEFINED_IN_ROUTE'
  }
}

module.exports = NoEndpointDefinedInRouteError
