const HttpView = require('.')

class HttpViewLocator
{
  locate()
  {
    return new HttpView
  }
}

module.exports = HttpViewLocator
