const jwt = require('jsonwebtoken')

module.exports = class extends require('.')
{
  get cert()
  {
    return (Date.now() / 1000).toString(36).split('.')[0]
  }

  write(vm)
  {
    if(!vm.headers)
      vm.headers = {}

    vm.headers['content-type'] = 'application/jwt'

    const
    options = { algorithm:vm.cert ? vm.algorithm : 'none' },
    body    = jwt.sign(vm.body, vm.cert, options)

    this.out.writeHead(vm.status || 200, vm.headers)
    this.out.end(body)
  }
}
