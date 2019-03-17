/**
 * @extends Error
 */
class InvalidIntegerUnsignedError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_INVALID_INTEGER_UNSIGNED'
  }
}

module.exports = InvalidIntegerUnsignedError
