class HttpError extends Error
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_HTTP_DISPATCHER'
  }
}

module.exports = HttpError
