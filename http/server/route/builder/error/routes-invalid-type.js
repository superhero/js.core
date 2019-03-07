class RoutesInvalidTypeError extends TypeError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_ROUTES_INVALID_TYPE'
  }
}

module.exports = RoutesInvalidTypeError
