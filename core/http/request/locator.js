const HttpRequest = require('.')

class HttpRequestLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    configuration = this.locator.locate('core/configuration'),
    options       = configuration.find('core.http.request.options'),
    object        = this.locator.locate('core/object'),
    httpRequest   = new HttpRequest(options, object)

    return httpRequest
  }
}

module.exports = HttpRequestLocator
