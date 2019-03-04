const Dispatcher = require('../../../http/server/dispatcher')

/**
 * @extends {@superhero/core/http/server/dispatcher}
 */
class CreateCalculationEndpoint extends Dispatcher
{
  dispatch()
  {
    const
    calculator    = this.locator.locate('calculator'),
    calculationId = calculator.createCalculation()

    this.view.body.id = calculationId
  }
}

module.exports = CreateCalculationEndpoint
