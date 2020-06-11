const HttpError = require('.')

class PreconditionRequired extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 428
  }
}

module.exports = PreconditionRequired
