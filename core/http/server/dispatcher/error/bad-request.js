const HttpError = require('.')

class BadRequest extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 400
  }
}

module.exports = BadRequest
