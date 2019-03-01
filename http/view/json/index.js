class HttpViewJson
{
  write(output, viewModel, route)
  {
    viewModel.headers['content-type'] = 'application/json'

    const body = viewModel.meta.pretty || route.pretty
    ? JSON.stringify(viewModel.body, null, 2)
    : JSON.stringify(viewModel.body)

    output.writeHead(viewModel.meta.status || 200, viewModel.headers)
    output.end(body)
  }
}

module.exports = HttpViewJson
