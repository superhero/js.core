module.exports = class
{
  compose(vm)
  {
    if(!vm.headers)
      vm.headers = {}

    vm.headers['content-type'] = 'application/json'

    return vm.pretty
    ? JSON.stringify(vm.body, null, 2)
    : JSON.stringify(vm.body)
  }
}
