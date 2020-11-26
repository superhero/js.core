const
soap        = require('soap'),
SoapServer  = require('.')

class SoapServerLocator
{
  constructor(locator)
  {
    this.locator = locator
  }

  locate()
  {
    const soapServer = new SoapServer(soap)
    return soapServer
  }
}

module.exports = SoapServerLocator
