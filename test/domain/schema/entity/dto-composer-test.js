/**
 * @memberof Domain
 * @typedef {Object} EntityDtoTest
 * @property {string} test
 */
const entity =
{
  'test1':
  {
    'type': 'string',
    'enum':
    [
      'foo',
      'bar',
    ]
  },
  'test2':
  {
    'type': 'string',
    'enum':
    [
      'baz',
      'qux'
    ]
  }
}

module.exports = entity
