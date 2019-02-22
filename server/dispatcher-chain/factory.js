const ServerDispatcherChain = require('.')

class ServerDispatcherChainFactory
{
  constructor(locator)
  {
    this.locator = locator
  }

  create()
  {
    const
    path            = this.locator.locate('path'),
    dispatcherChain = new ServerDispatcherChain(path)

    return dispatcherChain
  }
}

module.exports = ServerDispatcherChainFactory
