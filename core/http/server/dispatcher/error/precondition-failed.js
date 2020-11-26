const HttpError = require('.')

class PreconditionFailed extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 412
  }
}

module.exports = PreconditionFailed
