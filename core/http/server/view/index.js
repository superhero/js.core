class HttpView
{
  write(output, viewModel)
  {
    if(typeof viewModel.body === 'string'
    || viewModel.body instanceof Buffer)
    {
      viewModel.headers['content-length'] = Buffer.byteLength(viewModel.body)
  
      output.writeHead(viewModel.meta.status || 200, viewModel.headers)
      output.end(viewModel.body)
    }
    else
    {
      const msg = 'Internal Server Error'
        
      output.writeHead(500)
      output.end(msg)

      const error = new Error('Incorrect type of the view model body, expected a string or Buffer; received: ' + typeof viewModel.body)
      error.code  = 'E_CORE_HTTP_SERVER_VIEW'
      error.chain = { viewModel }
      throw error
    }
  }
}

module.exports = HttpView
