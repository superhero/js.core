/**
 * @extends Error
 */
class InvalidEnumError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_INVALID_ENUM'
  }
}

module.exports = InvalidEnumError
