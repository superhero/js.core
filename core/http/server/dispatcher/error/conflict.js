const HttpError = require('.')

class Conflict extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 409
  }
}

module.exports = Conflict
