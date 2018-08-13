module.exports = class extends require('.')
{
  write(vm)
  {
    this.out.writeHead(vm.status || 200, vm.headers)
    this.out.end(vm.body)
  }
}
