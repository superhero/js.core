class ServerDispatcherBadRequestError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 400
  }
}

module.exports = ServerDispatcherBadRequestError
