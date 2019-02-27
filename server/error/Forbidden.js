const ServerError = require('.')

class ServerErrorForbidden extends ServerError
{
  constructor(...args)
  {
    super(...args)
    this.code = 403
  }
}

module.exports = ServerErrorForbidden
