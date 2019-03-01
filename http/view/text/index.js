class HttpViewText
{
  write(output, viewModel)
  {
    viewModel.headers['content-type'] = 'text/plain'

    output.writeHead(viewModel.status || 200, viewModel.headers)
    output.end(`${viewModel.body}`)
  }
}

module.exports = HttpViewText
