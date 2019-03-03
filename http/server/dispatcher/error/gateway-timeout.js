const HttpError = require('.')

class BadGateway extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 504
  }
}

module.exports = BadGateway
