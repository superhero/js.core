const HttpViewJson = require('.')

class HttpViewJsonLocator
{
  locate()
  {
    return new HttpViewJson
  }
}

module.exports = HttpViewJsonLocator
