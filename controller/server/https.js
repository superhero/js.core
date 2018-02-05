const https = require('https')

module.exports = class extends require('./http')
{
  createServer(options)
  {
    if(!this.server)
      this.server = https.createServer(options, this.io.bind(this))
  }
}
