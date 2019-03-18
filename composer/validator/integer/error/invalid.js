/**
 * @extends {Error}
 */
class InvalidIntegerError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_INVALID_INTEGER'
  }
}

module.exports = InvalidIntegerError
