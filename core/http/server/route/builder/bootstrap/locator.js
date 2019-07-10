const HttpServerRouteBuilderBootstrap = require('.')

class HttpServerRouteBuilderBootstrapLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const configuration = this.locator.locate('core/configuration')
    return new HttpServerRouteBuilderBootstrap(configuration, this.locator)
  }
}

module.exports = HttpServerRouteBuilderBootstrapLocator
