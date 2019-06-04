/**
 * @memberof Domain
 * @extends {Error}
 */
class CalculationCouldNotBeFoundError extends Error
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_CALCULATION_COULD_NOT_BE_FOUND'
  }
}

module.exports = CalculationCouldNotBeFoundError
