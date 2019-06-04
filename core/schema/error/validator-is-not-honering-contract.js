/**
 * @extends {Error}
 */
class ValidatorIsNotHoneringContractError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_VALIDATOR_IS_NOT_HONERING_CONTRACT'
  }
}

module.exports = ValidatorIsNotHoneringContractError
