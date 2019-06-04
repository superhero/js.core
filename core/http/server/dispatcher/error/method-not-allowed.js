const HttpError = require('.')

class MethodNotAllowed extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 405
  }
}

module.exports = MethodNotAllowed
