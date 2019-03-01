const HttpRequestBuilder = require('.')

class HttpRequestBuilderLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    deepfreeze          = this.locator.locate('deepfreeze'),
    httpRequestBuilder  = new HttpRequestBuilder(deepfreeze)

    return httpRequestBuilder
  }
}

module.exports = HttpRequestBuilderLocator
