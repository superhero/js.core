const DispatcherChainEndedError = require('./error/dispatcher-chain-ended')

class ServerDispatcherChain
{
  constructor(path)
  {
    this.path = path
  }

  async chain(dispatchers, report, i)
  {
    const
    dispatcher  = dispatchers[i++],
    next        = this.dispatch.bind(this, dispatchers, report, i)

    try
    {
      report['dispatch.chain'].push(dispatcher.constructor.name)
      await dispatcher.dispatch(next)
    }
    catch(error)
    {
      await dispatcher.onError(error)
    }
  }

  async dispatch(dispatchers, report, i = 0)
  {
    if(i < dispatchers.length)
    {
      await this.chain(dispatchers, report, i)
    }
    else
    {
      const msg = `dispatcher chain has already finished "${i}/${dispatchers.length}"`
      throw new DispatcherChainEndedError(msg)
    }
  }
}

module.exports = ServerDispatcherChain
