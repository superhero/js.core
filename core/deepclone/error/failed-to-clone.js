class FailedToCloneError extends Error
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_FAILED_TO_CLONE'
  }
}

module.exports = FailedToCloneError
