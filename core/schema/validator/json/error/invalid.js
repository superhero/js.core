/**
 * @extends {Error}
 */
class InvalidJsonError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_INVALID_JSON'
  }
}

module.exports = InvalidJsonError
