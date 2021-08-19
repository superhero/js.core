const 
  CoreCrypto  = require('.'),
  crypto      = require('crypto')

class CoreCryptoLocator
{
  locate()
  {
    return new CoreCrypto(crypto)
  }
}

module.exports = CoreCryptoLocator
