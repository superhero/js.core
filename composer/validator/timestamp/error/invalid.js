/**
 * @extends {Error}
 */
class InvalidTimestampError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_INVALID_TIMESTAMP'
  }
}

module.exports = InvalidTimestampError
