const https = require('https')

module.exports = class extends require('./http')
{
  createServer(options)
  {
    return https.createServer(options, this.io.bind(this))
  }
}
