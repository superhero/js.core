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
    error_options   = { ...options, color:'red',    prefix:'error:'   },
    warning_options = { ...options, color:'yellow', prefix:'warning:' },
    error           = new Debug(error_options),
    warning         = new Debug(warning_options)

    this.error   = error.error.bind(error)
    this.warning = warning.log.bind(warning)
  }
}

module.exports = Console
