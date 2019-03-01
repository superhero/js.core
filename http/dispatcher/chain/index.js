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

    return dispatcher.viewModel
  }

  async dispatch(dispatchers, i = 0)
  {
    if(i < dispatchers.length)
    {
      const viewModel = await this.chain(dispatchers, i)
      return viewModel
    }

    const msg = `dispatcher chain has already finished "${i}/${dispatchers.length}"`
    throw new DispatcherChainEndedError(msg)
  }
}

module.exports = ServerDispatcherChain
