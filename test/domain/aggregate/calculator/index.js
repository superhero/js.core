const
CalculationCouldNotBeFoundError = require('./error/calculation-could-not-be-found'),
InvalidCalculationTypeError     = require('./error/invalid-calculation-type')

/**
 * Calculator service, manages calculations
 * @memberof Domain
 */
class AggregateCalculator
{
  /**
   * @param {superhero/core/eventbus} eventbus
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
    this.eventbus.emit('calculation created', { id })
    return id
  }

  /**
   * @throws {E_CALCULATION_COULD_NOT_BE_FOUND}
   * @throws {E_INVALID_CALCULATION_TYPE}
   *
   * @param {CalculatorCalculation} dto
   *
   * @returns {number} the result of the calculation
   */
  appendToCalculation({ id, type, value })
  {
    if(id < 1
    || id > this.calculations.length)
    {
      throw new CalculationCouldNotBeFoundError(`ID out of range: "${id}/${this.calculations.length}"`)
    }

    switch(type)
    {
      case 'addition':
      {
        const result = this.calculations[id - 1] += value
        this.eventbus.emit('calculation appended', { id, type, result })
        return result
      }
      case 'subtraction':
      {
        const result = this.calculations[id - 1] -= value
        this.eventbus.emit('calculation appended', { id, type, result })
        return result
      }
      default:
      {
        throw new InvalidCalculationTypeError(`Unrecognized type used for calculation: "${type}"`)
      }
    }
  }
}

module.exports = AggregateCalculator
