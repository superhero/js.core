class DispatcherChainEndedError extends Error
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_DISPATCHER_CHAIN_ENDED'
  }
}

module.exports = DispatcherChainEndedError
