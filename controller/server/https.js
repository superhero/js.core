const https = require('https')

module.exports = class extends require('./http')
{
  constructor(options, router, locator)
  {
    options = Object.assign({ prefix:'https server:' }, options)
    super(options, router, locator)
  }

  createServer(options)
  {
    return https.createServer(options, this.io.bind(this))
  }
}
