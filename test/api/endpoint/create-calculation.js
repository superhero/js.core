const Dispatcher = require('../../../core/http/server/dispatcher')

/**
 * @memberof Api
 * @extends {superhero/core/http/server/dispatcher}
 */
class CreateCalculationEndpoint extends Dispatcher
{
  dispatch()
  {
    const
    calculator    = this.locator.locate('domain/aggregate/calculator'),
    calculationId = calculator.createCalculation()

    this.view.body.id = calculationId
  }
}

module.exports = CreateCalculationEndpoint
