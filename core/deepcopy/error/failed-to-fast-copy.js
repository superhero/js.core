class FailedToFastCopyError extends Error
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_FAILED_TO_FAST_COPY'
  }
}

module.exports = FailedToFastCopyError
