/**
 * @extends Error
 */
class ConstituentIsNotHoneringContractError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_CONSTITUENT_IS_NOT_HONERING_CONTRACT'
  }
}

module.exports = ConstituentIsNotHoneringContractError
