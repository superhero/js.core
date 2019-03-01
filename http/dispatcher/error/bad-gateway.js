const HttpError = require('.')

class BadGateway extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 502
  }
}

module.exports = BadGateway
