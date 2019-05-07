const HttpViewStream = require('.')

class HttpViewStreamLocator
{
  locate()
  {
    return new HttpViewStream
  }
}

module.exports = HttpViewStreamLocator
