const HttpRequest = require('@superhero/request')

class HttpRequestLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    configuration   = this.locator.locate('configuration'),
    requestOptions  = configuration.find('http.request.options'),
    httpRequest     = new HttpRequest(requestOptions)

    return httpRequest
  }
}

module.exports = HttpRequestLocator
