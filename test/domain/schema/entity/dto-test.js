/**
 * @memberof Domain
 * @typedef {Object} EntityDtoTest
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
