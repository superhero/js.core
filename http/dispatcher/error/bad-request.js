const ServerError = require('.')

class ServerErrorBadRequest extends ServerError
{
  constructor(...args)
  {
    super(...args)
    this.code = 400
  }
}

module.exports = ServerErrorBadRequest
