const HttpError = require('.')

class NotFound extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 404
  }
}

module.exports = NotFound
