class ServerDispatcherChainEndedError extends Error
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_DISPATCHER_CHAIN_ENDED'
  }
}

module.exports = ServerDispatcherChainEndedError
