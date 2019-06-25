class InvalidDtoTypeError extends TypeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_HTTP_SERVER_ROUTE_BUILDER_INVALID_DTO'
  }
}

module.exports = InvalidDtoTypeError
