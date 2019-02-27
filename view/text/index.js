class ViewText
{
  write(output, viewModel)
  {
    viewModel.headers['content-type'] = 'text/plain'

    this.out.writeHead(viewModel.status || 200, viewModel.headers)
    this.out.end(`${viewModel.body}`)
  }
}

module.exports = ViewText
