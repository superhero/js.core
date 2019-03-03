const HttpError = require('.')

class RequestTimeout extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 408
  }
}

module.exports = RequestTimeout
