const https = require('https')

module.exports = class extends require('./http')
{
  constructor(router, options)
  {
    super(router)
    this.options = options
  }

  createServer()
  {
    if(!this.server)
      this.server = https.createServer(this.options, this.io.bind(this))
  }
}
