module.exports = class extends require('./http')
{
  constructor(router, options)
  {
    this.router = router
    this.server = require('https').createServer(options, this.io.bind(this))
  }
}
