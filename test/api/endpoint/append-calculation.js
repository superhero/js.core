const
Dispatcher      = require('../../../core/http/server/dispatcher'),
NotFoundError   = require('../../../core/http/server/dispatcher/error/not-found'),
BadRequestError = require('../../../core/http/server/dispatcher/error/bad-request')

/**
 * @memberof Api
 * @extends {superhero/core/http/server/dispatcher}
 */
class AppendCalculationEndpoint extends Dispatcher
{
  dispatch()
  {
    const
    calculator  = this.locator.locate('domain/aggregate/calculator'),
    calculation = this.route.dto,
    result      = calculator.appendToCalculation(calculation)

    this.view.body.result = result
  }

  onError(error)
  {
    switch(error)
    {
      case 'E_CALCULATION_COULD_NOT_BE_FOUND':
        throw new NotFoundError('Calculation could not be found')

      case 'E_INVALID_CALCULATION_TYPE':
        throw new BadRequestError(`Unrecognized type: "${this.route.dto.type}"`)

      default:
        throw error
    }
  }
}

module.exports = AppendCalculationEndpoint
