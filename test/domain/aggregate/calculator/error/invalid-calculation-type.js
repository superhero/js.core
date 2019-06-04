/**
 * @memberof Domain
 * @extends {Error}
 */
class InvalidCalculationTypeError extends Error
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_INVALID_CALCULATION_TYPE'
  }
}

module.exports = InvalidCalculationTypeError
