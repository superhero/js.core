const HttpError = require('.')

class TooManyRequests extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 429
  }
}

module.exports = TooManyRequests
