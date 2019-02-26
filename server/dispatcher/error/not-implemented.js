class ServerDispatcherNotImplementedError extends ReferenceError
{
  constructor(...a)
  {
    super(...a)
    this.code = 501
  }
}

module.exports = ServerDispatcherNotImplementedError
