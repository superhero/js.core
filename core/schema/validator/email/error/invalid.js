/**
 * @extends {Error}
 */
class InvalidEmailError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_INVALID_EMAIL'
  }
}

module.exports = InvalidEmailError
