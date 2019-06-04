/**
 * @memberof Domain
 * @typedef {Object} EntityCalculation
 * @property {number} id
 * @property {string} type
 * @property {number} value
 */
const entity =
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

module.exports = entity
