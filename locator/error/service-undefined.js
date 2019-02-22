class ServiceUndefinedError extends require('error')
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_SERVICE_UNDEFINED'
  }
}

module.exports = ServiceUndefinedError
