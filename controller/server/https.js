const https = require('https')

module.exports = class extends require('./http')
{
  constructor(router, options)
  {
    this.config = Object.assign({ prefix:'https server:' }, options)
    this.router = router
    this.debug  = new Debug(this.config)
  }

  createServer(options)
  {
    return https.createServer(options, this.io.bind(this))
  }
}
