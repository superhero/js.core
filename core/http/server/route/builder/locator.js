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
    deepclone = this.locator.locate('core/deepclone'),
    composer  = this.locator.locate('core/schema/composer'),
    object    = this.locator.locate('core/object'),
    builder   = new HttpServerRouteBuilder(deepmerge, deepclone, composer, object)

    return builder
  }
}

module.exports = HttpServerRouteBuilderLocator
