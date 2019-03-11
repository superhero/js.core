const
Dispatcher        = require('../../../http/server/dispatcher'),
PageNotFoundError = require('../../../http/server/dispatcher/error/page-not-found'),
BadRequestError   = require('../../../http/server/dispatcher/error/bad-request')

/**
 * @extends {@superhero/core/http/server/dispatcher}
 */
class AppendCalculationEndpoint extends Dispatcher
{
  dispatch()
  {
    const
    id          = this.route.dto.id,
    type        = this.route.dto.type,
    value       = this.route.dto.value,
    calculator  = this.locator.locate('calculator'),
    result      = calculator.appendToCalculation(+id, type, +value)

    this.view.body.result = result
  }

  onError(error)
  {
    switch(error)
    {
      case 'E_CALCULATION_COULD_NOT_BE_FOUND':
        throw new PageNotFoundError('Calculation could not be found')

      case 'E_INVALID_CALCULATION_TYPE':
        throw new BadRequestError(`Unrecognized type: "${this.route.dto.type}"`)

      default:
        throw error
    }
  }
}

module.exports = AppendCalculationEndpoint
