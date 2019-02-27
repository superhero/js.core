const ServerError = require('.')

class ServerErrorNotImplemented extends ServerError
{
  constructor(...args)
  {
    super(...args)
    this.code = 501
  }
}

module.exports = ServerErrorNotImplemented
