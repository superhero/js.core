const ServerDecoder = require('.')

class ServerDecoderLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
    path    = this.locator.locate('core/path'),
    decoder = new ServerDecoder(path, this.locator)

    return decoder
  }
}

module.exports = ServerDecoderLocator
