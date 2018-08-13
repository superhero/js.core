module.exports = class extends require('.')
{
  write(vm)
  {
    vm.stream.pipe(this.out)
  }
}
