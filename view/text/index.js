class ViewText
{
  write(output, vm)
  {
    if(!vm.headers)
      vm.headers = {}

    vm.headers['content-type'] = 'text/plain'

    this.out.writeHead(vm.status || 200, vm.headers)
    this.out.end(`${vm.body}`)
  }
}

module.exports = ViewText
