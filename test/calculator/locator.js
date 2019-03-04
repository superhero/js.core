const
Calculator        = require('.'),
LocatorComposite  = require('../../locator/composite')

/**
 * @extends {@superhero/core/locator/composite}
 */
class CalculatorLocator extends LocatorComposite
{
  /**
   * @returns {Calculator}
   */
  locate()
  {
    const eventbus = this.locator.locate('eventbus')
    return new Calculator(eventbus)
  }
}

module.exports = CalculatorLocator
