class ServiceUndefinedError extends ReferenceError
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_SERVICE_UNDEFINED'
  }
}

module.exports = ServiceUndefinedError
