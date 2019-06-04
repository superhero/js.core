const
Dispatcher        = require('../../../core/http/server/dispatcher'),
PageNotFoundError = require('../../../core/http/server/dispatcher/error/page-not-found'),
BadRequestError   = require('../../../core/http/server/dispatcher/error/bad-request')

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
    schema      = this.locator.locate('core/schema'),
    calculation = schema.compose('entity/calculation', this.route.dto),
    result      = calculator.appendToCalculation(calculation)

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

      case 'E_SCHEMA_INVALID_ATTRIBUTE':
        throw new BadRequestError(error.message)

      default:
        throw error
    }
  }
}

module.exports = AppendCalculationEndpoint
