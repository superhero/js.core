class NotHoneringDispatcherContractError extends Error
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_NOT_HONERING_DISPATCHER_CONTRACT'
  }
}

module.exports = NotHoneringDispatcherContractError
