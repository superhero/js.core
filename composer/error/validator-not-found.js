/**
 * @extends {Error}
 */
class ValidatorNotFoundError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_VALIDATOR_NOT_FOUND'
  }
}

module.exports = ValidatorNotFoundError
