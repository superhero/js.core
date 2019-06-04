class HttpViewStream
{
  write(output, viewModel, route)
  {
    output.writeHead(viewModel.meta.status || 200, viewModel.headers)
    viewModel.meta.stream.pipe(output)
  }
}

module.exports = HttpViewStream
