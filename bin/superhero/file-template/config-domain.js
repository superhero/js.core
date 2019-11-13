module.exports = (ns) =>
`/**
 * @namespace ${ns}
 */
module.exports =
{
  core:
  {
    schema:
    {
      composer:
      {
        'event/*'         : __dirname + '/schema/event/*',
        'value-object/*'  : __dirname + '/schema/value-object/*',
        'entity/*'        : __dirname + '/schema/entity/*'
      }
    },
    locator:
    {
      'aggregate/*' : __dirname + '/aggregate/*',
      'service/*'   : __dirname + '/service/*'
    }
  }
}
`
