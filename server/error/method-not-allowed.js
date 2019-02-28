const ServerError = require('.')

class ServerErrorMethodNotAllowed extends ServerError
{
  constructor(...args)
  {
    super(...args)
    this.code = 405
  }
}

module.exports = ServerErrorMethodNotAllowed
