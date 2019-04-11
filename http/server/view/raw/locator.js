const HttpViewRaw = require('.')

class HttpViewRawLocator
{
  locate()
  {
    return new HttpViewRaw
  }
}

module.exports = HttpViewRawLocator
