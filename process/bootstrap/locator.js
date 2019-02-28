const ProcessBootstrap = require('.')

class ProcessBootstrapLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const eventbus = this.locator.locate('eventbus')
    return new ProcessBootstrap(eventbus)
  }
}

module.exports = ProcessBootstrapLocator
