/**
 * @typedef {Object} CalculatorCalculation
 * @property {number} id
 * @property {string} type
 * @property {number} value
 */
const dto =
{
  'id':
  {
    'type'    : 'integer',
    'unsigned': true
  },
  'type':
  {
    'type': 'string',
    'enum':
    [
      'addition',
      'subtraction'
    ]
  },
  'value':
  {
    'type': 'decimal'
  }
}

module.exports = dto
