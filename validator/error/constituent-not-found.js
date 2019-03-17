/**
 * @extends Error
 */
class ConstituentNotFoundError extends Error
{
  constructor(...a)
  {
    super(...a)
    this.code = 'E_CONSTITUENT_NOT_FOUND'
  }
}

module.exports = ConstituentNotFoundError
