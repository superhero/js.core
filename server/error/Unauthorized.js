const ServerError = require('.')

class ServerErrorUnauthorized extends ServerError
{
  constructor(...args)
  {
    super(...args)
    this.code = 401
  }
}

module.exports = ServerErrorUnauthorized
