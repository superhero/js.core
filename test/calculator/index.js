const
CalculationCouldNotBeFoundError = require('./error/calculation-could-not-be-found'),
InvalidCalculationTypeError     = require('./error/invalid-calculation-type')

/**
 * Calculator service, manages calculations
 */
class Calculator
{
  /**
   * @param {@superhero/eventbus} eventbus
   */
  constructor(eventbus)
  {
    this.eventbus     = eventbus
    this.calculations = []
  }

  /**
   * @returns {number} the id of the created calculation
   */
  createCalculation()
  {
    const id = this.calculations.push(0)
    this.eventbus.emit('calculator.calculation-created', { id })
    return id
  }

  /**
   * @throws {E_CALCULATION_COULD_NOT_BE_FOUND}
   * @throws {E_INVALID_CALCULATION_TYPE}
   *
   * @param {number} id the id of the calculation
   * @param {string} type the type of calculation to be appended
   * @param {number} value the value to be appended
   *
   * @returns {number} the result of the calculation
   */
  appendToCalculation(id, type, value)
  {
    if(id < 1
    || id > this.calculations.length)
    {
      throw new CalculationCouldNotBeFoundError(`Id out of range: "${id}/${this.calculations.length}"`)
    }

    switch(type)
    {
      case 'addition':
      {
        const calculation = this.calculations[id - 1] += value
        this.eventbus.emit('calculator.calculation-appended', { id, type, calculation })
        return calculation
      }
      case 'subtraction':
      {
        const calculation = this.calculations[id - 1] -= value
        this.eventbus.emit('calculator.calculation-appended', { id, type, calculation })
        return calculation
      }
      default:
      {
        throw new InvalidCalculationTypeError(`Unrecognized type used for calculation: "${type}"`)
      }
    }
  }
}

module.exports = Calculator
