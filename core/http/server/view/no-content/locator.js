const HttpViewNoContent = require('.')

class HttpViewNoContentLocator
{
  locate()
  {
    return new HttpViewNoContent
  }
}

module.exports = HttpViewNoContentLocator
