const ServerError = require('.')

class ServerErrorServiceUnavailable extends ServerError
{
  constructor(...args)
  {
    super(...args)
    this.code = 503
  }
}

module.exports = ServerErrorServiceUnavailable
