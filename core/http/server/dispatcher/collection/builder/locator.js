const ServerDispatcherCollectionBuilder = require('.')

class ServerDispatcherCollectionBuilderLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    path                        = this.locator.locate('core/path'),
    dispatcherCollectionBuilder = new ServerDispatcherCollectionBuilder(path, this.locator)

    return dispatcherCollectionBuilder
  }
}

module.exports = ServerDispatcherCollectionBuilderLocator
