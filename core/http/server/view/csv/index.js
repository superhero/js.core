class HttpViewCsv
{
  write(output, viewModel, route)
  {
    if(this.isValid(viewModel))
    {
      const 
      filename  = viewModel.meta.filename   || route.filename   || 'data',
      lineBreak = viewModel.meta.lineBreak  || route.lineBreak  || '\n'

      viewModel.headers['content-type']         = 'text/csv'
      viewModel.headers['content-disposition']  = `attachment;filename=${filename}.csv`

      const 
      keys      = Object.keys(viewModel.body[0] || {}),
      csvHeader = keys.map((key) => `'${this.escapeValue(key)}'`).join(',')

      /*
      let contentLength = csvHeader.length

      for(const item of viewModel.body)
      {
        const row = keys.map((key) => `'${this.escapeValue(item[key])}'`).join(',')
        
        contentLength += (row + lineBreak).length
      }

      viewModel.headers['content-length'] = contentLength
      */

      output.writeHead(200, viewModel.headers)

      output.write(csvHeader + lineBreak)

      for(const item of viewModel.body)
      {
        const row = keys.map((key) => `'${this.escapeValue(item[key])}'`).join(',')

        // Returns true if the entire data was flushed successfully to the kernel buffer. Returns false if all or part of the data was queued in user memory. 
        // 'drain' will be emitted when the buffer is free again.
        output.write(row + lineBreak)
      }

      output.end()
    }
    else
    {
      output.writeHead(500, viewModel.headers)
      output.end('invalid csv model')
    }
  }

  isValid(viewModel)
  {
    const isValid = Array.isArray(viewModel.body)
    && viewModel.body.every((item) => typeof item === 'object' && item !== null)

    return isValid
  }

  escapeValue(value)
  {
    return `${value}`.replace(/'/g, "\\'")
  }
}

module.exports = HttpViewCsv
