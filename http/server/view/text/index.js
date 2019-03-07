class HttpViewText
{
  write(output, viewModel)
  {
    const body = `${viewModel.body}`

    viewModel.headers['Content-Type']   = 'text/plain'
    viewModel.headers['Content-Length'] = body.length

    output.writeHead(viewModel.status || 200, viewModel.headers)
    output.end(body)
  }
}

module.exports = HttpViewText
