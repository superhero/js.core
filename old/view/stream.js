module.exports = class extends require('.')
{
  write(vm)
  {
    this.out.writeHead(vm.status || 200, vm.headers)
    vm.stream.pipe(this.out)
  }
}
