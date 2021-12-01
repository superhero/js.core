class FailedToDecodeError extends Error
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_HTTP_SERVER_ROUTE_BUILDER_FAILED_TO_DECODE'
  }
}

module.exports = FailedToDecodeError