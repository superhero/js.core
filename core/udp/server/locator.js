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
      routes        = configuration.find('core/udp/server/routes'),
      udpServer     = new UdpServer(routes, this.locator)

    return udpServer
  }
}

module.exports = UdpServerLocator
