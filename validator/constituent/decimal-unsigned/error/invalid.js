/**
 * @extends Error
 */
class InvalidDecimalUnsignedError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_INVALID_DECIMAL_UNSIGNED'
  }
}

module.exports = InvalidDecimalUnsignedError
