const DispatcherChainEndedError = require('./error/dispatcher-chain-ended')

class ServerDispatcherChain
{
  constructor(path)
  {
    this.path = path
  }

  async chain(dispatchers, i)
  {
    const
    dispatcher  = dispatchers[i++],
    next        = this.dispatch.bind(this, dispatchers, i)

    try
    {
      await dispatcher.dispatch(next)
    }
    catch(error)
    {
      await dispatcher.onError(error)
    }
  }

  async dispatch(dispatchers, i = 0)
  {
    if(i < dispatchers.length)
    {
      await this.chain(dispatchers, i)
    }
    else
    {
      const msg = `dispatcher chain has already finished "${i}/${dispatchers.length}"`
      throw new DispatcherChainEndedError(msg)
    }
  }
}

module.exports = ServerDispatcherChain
