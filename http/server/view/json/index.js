class HttpViewJson
{
  write(output, viewModel, route)
  {
    const body = viewModel.meta.pretty || route.pretty
    ? JSON.stringify(viewModel.body, null, 2)
    : JSON.stringify(viewModel.body)

    viewModel.headers['Content-Type']   = 'application/json'
    viewModel.headers['Content-Length'] = body.length

    output.writeHead(viewModel.meta.status || 200, viewModel.headers)
    output.end(body)
  }
}

module.exports = HttpViewJson
