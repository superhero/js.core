class HttpViewText
{
  write(output, viewModel)
  {
    const body = `${viewModel.body}`

    viewModel.headers['content-type']   = 'text/plain'
    viewModel.headers['content-length'] = Buffer.byteLength(body)

    output.writeHead(viewModel.status || 200, viewModel.headers)
    output.end(body)
  }
}

module.exports = HttpViewText
