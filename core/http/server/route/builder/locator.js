const HttpServerRouteBuilder = require('.')

class HttpServerRouteBuilderLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    deepmerge = this.locator.locate('core/deepmerge'),
    composer  = this.locator.locate('core/schema/composer'),
    builder   = new HttpServerRouteBuilder(deepmerge, composer)

    return builder
  }
}

module.exports = HttpServerRouteBuilderLocator
