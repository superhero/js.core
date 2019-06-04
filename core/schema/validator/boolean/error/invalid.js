/**
 * @extends {Error}
 */
class InvalidBooleanError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_INVALID_BOOLEAN'
  }
}

module.exports = InvalidBooleanError
