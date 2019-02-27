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

    await dispatcher.dispatch(next)
    return dispatcher.viewModel
  }

  async dispatch(dispatchers, i = 0)
  {
    if(i < dispatchers.length)
    {
      const viewModel = await this.chain(dispatchers, i)
      return viewModel
    }

    // TODO fix error
    const msg = `dispatcher chain has already finished "${i}/${dispatchers.length}"`
    throw new Error(msg)
  }
}

module.exports = ServerDispatcherChain
