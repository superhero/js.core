/**
 * @extends {Error}
 */
class InvalidPhoneNumberError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_INVALID_PHONE_NUMBER'
  }
}

module.exports = InvalidPhoneNumberError
