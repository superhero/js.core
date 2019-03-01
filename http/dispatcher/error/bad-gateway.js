const ServerError = require('.')

class ServerErrorBadGateway extends ServerError
{
  constructor(...args)
  {
    super(...args)
    this.code = 502
  }
}

module.exports = ServerErrorBadGateway
