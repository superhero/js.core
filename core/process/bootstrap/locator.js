const ProcessBootstrap = require('.')

class ProcessBootstrapLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const eventbus = this.locator.locate('core/eventbus')
    return new ProcessBootstrap(eventbus)
  }
}

module.exports = ProcessBootstrapLocator
