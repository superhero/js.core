const UdpServer = require('.')

class UdpServerLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const
      configuration = this.locator.locate('core/configuration'),
      router        = configuration.find('core/udp/server/router'),
      udpServer     = new UdpServer(router, this.locator)

    return udpServer
  }
}

module.exports = UdpServerLocator
