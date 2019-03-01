const ServerError = require('.')

class ServerErrorPageNotFound extends ServerError
{
  constructor(...args)
  {
    super(...args)
    this.code = 404
  }
}

module.exports = ServerErrorPageNotFound
