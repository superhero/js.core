module.exports = class extends require('.')
{
  write(vm)
  {
    if(!vm.headers)
      vm.headers = {}

    vm.headers['content-type'] = 'application/json'

    const body = vm.pretty
    ? JSON.stringify(vm.body, null, 2)
    : JSON.stringify(vm.body)

    this.out.writeHead(vm.status || 200, vm.headers)
    this.out.end(body)
  }
}
