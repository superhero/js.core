const HttpRouteBuilder = require('.')

class HttpRouteBuilderLocator
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
    builder   = new HttpRouteBuilder(deepmerge, composer)

    return builder
  }
}

module.exports = HttpRouteBuilderLocator
