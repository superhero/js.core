class HttpViewCsv
{
  write(output, viewModel, route)
  {
    if(this.isValid(viewModel))
    {
      const filename = viewModel.meta.filename || route.filename || 'data'

      viewModel.headers['content-type']         = 'text/csv; charset=utf-8'
      viewModel.headers['content-disposition']  = `attachment;filename=${filename}.csv`

      const 
      keys      = Object.keys(viewModel.body[0] || {}),
      csvHeader = keys.map((key) => `'${this.escapeValue(key)}'`).join(',')

      output.write(csvHeader)

      for(const item of viewModel.body)
      {
        const row = keys.map((key) => `'${this.escapeValue(item[key])}'`).join(',')

        // Returns true if the entire data was flushed successfully to the kernel buffer. Returns false if all or part of the data was queued in user memory. 
        // 'drain' will be emitted when the buffer is free again.
        output.write(row)
      }

      output.writeHead(200, viewModel.headers)
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
    && viewModel.body.every((item) => typeof item === 'object' 
                                   && item !== null 
                                   && Object.values(item).every((item) => typeof item === 'string'))

    return isValid
  }

  escapeValue(value)
  {
    return (value || '').replace("'", "\\'")
  }
}

module.exports = HttpViewCsv
