class DispatcherCanNotBeResolvedError extends ReferenceError
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_DISPATCHER_CAN_NOT_BE_RESOLVED'
  }
}

module.exports = DispatcherCanNotBeResolvedError
