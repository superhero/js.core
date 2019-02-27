const ServerError = require('.')

class ServerErrorRequestTimeout extends ServerError
{
  constructor(...args)
  {
    super(...args)
    this.code = 408
  }
}

module.exports = ServerErrorRequestTimeout
