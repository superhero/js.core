const HttpError = require('.')

class ServerError extends HttpError
{
  constructor(...args)
  {
    super(...args)
    this.status = 500
  }
}

module.exports = ServerError
