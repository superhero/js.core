const Http2Request = require('.')

class Http2RequestLocator
{
  locate()
  {
    return new Http2Request()
  }
}

module.exports = Http2RequestLocator
