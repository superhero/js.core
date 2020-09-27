const Debug = require('@superhero/debug')

/**
 * @extends {@superhero/debug}
 */
class Console extends Debug
{
  constructor(options)
  {
    super(options)

    const
    error_options   = { prefix:'error:',    ...options, color:'red' },
    warning_options = { prefix:'warning:',  ...options, color:'yellow' },
    error           = new Debug(error_options),
    warning         = new Debug(warning_options)

    this.error   = error.error.bind(error)
    this.warning = warning.log.bind(warning)
  }
}

module.exports = Console
