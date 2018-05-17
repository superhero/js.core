module.exports = class
{
  compose(vm)
  {
    if(!vm.headers)
      vm.headers = {}

    vm.headers['content-type'] = 'application/json'

    return JSON.stringify(vm.body)
  }
}
