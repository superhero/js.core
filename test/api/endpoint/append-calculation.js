const
Dispatcher        = require('../../../http/server/dispatcher'),
PageNotFoundError = require('../../../http/server/dispatcher/error/page-not-found'),
BadRequestError   = require('../../../http/server/dispatcher/error/bad-request')

/**
 * @extends {@superhero/core/http/server/dispatcher}
 */
class AppendCalculationEndpoint extends Dispatcher
{
  async dispatch()
  {
    const
    calculator  = this.locator.locate('calculator'),
    composer    = this.locator.locate('composer'),
    calculation = await composer.compose('calculation', this.route.dto),
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

      case 'E_COMPOSER_INVALID_ATTRIBUTE':
        throw new BadRequestError(error.message)

      default:
        throw error
    }
  }
}

module.exports = AppendCalculationEndpoint
