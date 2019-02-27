class ServerDispatcherCollectionBuilder
{
  constructor(path, locator)
  {
    this.path     = path
    this.locator  = locator
  }

  build(route, request, session, viewModel)
  {
    const dispatchers = []

    for(const i in route.chain)
    {
      const dispatcher = this.createDispatcher(route.chain[i], route, request, session, viewModel)
      dispatchers.push(dispatcher)
    }

    const endpoint = this.createDispatcher(route.endpoint, route, request, session, viewModel)
    dispatchers.push(endpoint)

    return dispatchers
  }

  createDispatcher(pathname, route, request, session, viewModel)
  {
    pathname = `${this.path.main.dirname}/${pathname}`

    if(this.path.isResolvable(pathname))
    {
      const
      Dispatcher  = require(pathname),
      dispatcher  = new Dispatcher(route, request, session, this.locator, viewModel)

      if(typeof dispatcher.dispatch !== 'function')
      {
        // TODO ...
        throw new Error('not honering server dispatcher contract')
      }

      return dispatcher
    }
    else
    {
      // TODO ...
      throw new ReferenceError(`dispatcher "${pathname}" can not be resolved`)
    }
  }
}

module.exports = ServerDispatcherCollectionBuilder
