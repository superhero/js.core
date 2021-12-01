class InvalidDecoderError extends Error
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_HTTP_SERVER_ROUTE_BUILDER_INVALID_DECODER'
  }
}

module.exports = InvalidDecoderError
