class ViewJson
{
  write(output, vm, route)
  {
    if(!vm.headers)
      vm.headers = {}

    vm.headers['content-type'] = 'application/json'

    const body = vm.pretty || route.pretty
    ? JSON.stringify(vm.body, null, 2)
    : JSON.stringify(vm.body)

    output.writeHead(vm.status || 200, vm.headers)
    output.end(body)
  }
}

module.exports = ViewJson
