class ServerDispatcherChain
{
  constructor(path)
  {
    this.path = path
  }

  async chain(i, dispatcher)
  {
    const
    next      = this.dispatch.bind(this, i),
    viewModel = await dispatcher.dispatch(next)

    return viewModel
  }

  async dispatch(i = 0)
  {
    if(i < route.dispatchers.length)
    {
      const
      dispatcher  = route.dispatchers[i++],
      viewModel   = await this.chain(i, dispatcher)

      return viewModel
    }

    // TODO fix error
    const msg = `dispatcher chain has already finished "${i}/${route.dispatchers.length}"`
    throw new Error(msg)
  }
}

module.exports = ServerDispatcherChain
