class HttpViewJson
{
  write(output, viewModel, route)
  {
    const body = viewModel.meta.pretty || route.pretty
    ? JSON.stringify(viewModel.body, null, 2)
    : JSON.stringify(viewModel.body)

    viewModel.headers['content-type']   = 'application/json; charset=utf-8'
    viewModel.headers['content-length'] = Buffer.byteLength(body)

    output.writeHead(viewModel.meta.status || 200, viewModel.headers)
    output.end(body)
  }
}

module.exports = HttpViewJson
