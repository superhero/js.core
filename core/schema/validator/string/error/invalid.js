/**
 * @extends {Error}
 */
class InvalidStringError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_INVALID_STRING'
  }
}

module.exports = InvalidStringError
