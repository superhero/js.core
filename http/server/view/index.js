class HttpView
{
  write(output, viewModel)
  {
    viewModel.headers['Content-Length'] = Buffer.byteLength(viewModel.body)

    output.writeHead(viewModel.meta.status || 200, viewModel.headers)
    output.end(viewModel.body)
  }
}

module.exports = HttpView
