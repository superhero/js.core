class CoreError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_CORE_ERROR'
  }
}

module.exports = CoreError
