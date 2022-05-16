/**
 * @extends {Error}
 */
class InvalidHashError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_INVALID_HASH'
  }
}

module.exports = InvalidHashError
