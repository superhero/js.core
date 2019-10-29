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
    'type'    : 'schema',
    'schema'  : 'value-object/id',
    'trait'   : 'id'
  },
  'type':
  {
    'type': 'string',
    'enum':
    [
      'addition',
      'subtraction'
    ],
    'example' : 'addition'
  },
  'value':
  {
    'type'    : 'decimal',
    'example' : 123.45
  }
}

module.exports = entity
