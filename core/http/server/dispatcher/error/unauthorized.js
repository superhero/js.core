const HttpError = require('.')

class Unauthorized extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 401
  }
}

module.exports = Unauthorized
