class HttpError extends Error
{
  constructor(...args)
  {
    super(...args)
    this.code = 'HTTP_DISPATCHER_ERROR'
  }
}

module.exports = HttpError
