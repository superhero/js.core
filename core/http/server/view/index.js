class HttpView
{
  write(output, viewModel)
  {
    viewModel.headers['content-length'] = Buffer.byteLength(viewModel.body)

    output.writeHead(viewModel.meta.status || 200, viewModel.headers)
    output.end(viewModel.body)
  }
}

module.exports = HttpView
