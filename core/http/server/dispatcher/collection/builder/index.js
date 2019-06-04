const
NotHoneringDispatcherContractError  = require('./error/not-honering-dispatcher-contract'),
DispatcherCanNotBeResolvedError     = require('./error/dispatcher-can-not-be-resolved')

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

    for(const i in route.middleware)
    {
      const dispatcher = this.createDispatcher(route.middleware[i], route, request, session, viewModel)
      dispatchers.push(dispatcher)
    }

    const endpoint = this.createDispatcher(route.endpoint, route, request, session, viewModel)
    dispatchers.push(endpoint)

    return dispatchers
  }

  createDispatcher(pathname, route, request, session, viewModel)
  {
    const fullPathname = `${this.path.main.dirname}/${pathname}`

    if(this.path.isResolvable(fullPathname))
    {
      const
      Dispatcher  = require(fullPathname),
      dispatcher  = new Dispatcher(route, request, session, this.locator, viewModel)

      if(typeof dispatcher.dispatch !== 'function'
      || typeof dispatcher.onError  !== 'function')
      {
        const msg = `dispatcher "${pathname}" is not honering the server dispatcher contract`
        throw new NotHoneringDispatcherContractError(msg)
      }

      return dispatcher
    }
    else
    {
      const msg = `dispatcher "${pathname}" can not be resolved in request: ${request.method} -> ${request.url}`
      throw new DispatcherCanNotBeResolvedError(msg)
    }
  }
}

module.exports = ServerDispatcherCollectionBuilder
