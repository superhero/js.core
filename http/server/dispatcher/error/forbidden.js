const HttpError = require('.')

class Forbidden extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 403
  }
}

module.exports = Forbidden
