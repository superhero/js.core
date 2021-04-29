class HttpViewNoContent
{
  write(output, viewModel)
  {
    viewModel.headers['content-length'] = 0

    output.writeHead(204, viewModel.headers)
    output.end()
  }
}

module.exports = HttpViewNoContent
