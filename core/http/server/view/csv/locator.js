const HttpViewCsv = require('.')

class HttpViewCsvLocator
{
  locate()
  {
    return new HttpViewCsv
  }
}

module.exports = HttpViewCsvLocator
