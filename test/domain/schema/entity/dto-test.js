/**
 * @memberof Domain
 * @typedef {Object} EntityCalculation
 * @property {string} test
 */
const entity =
{
  'test':
  {
    'type': 'string',
    'enum':
    [
      'foo',
      'bar',
      'baz',
      'qux'
    ]
  }
}

module.exports = entity
