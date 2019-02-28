const ServerError = require('.')

class ServerErrorBadGateway extends ServerError
{
  constructor(...args)
  {
    super(...args)
    this.code = 504
  }
}

module.exports = ServerErrorBadGateway
