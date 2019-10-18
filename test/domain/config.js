/**
 * @namespace Domain
 */
module.exports =
{
  core:
  {
    schema:
    {
      composer:
      {
        'entity/*'        : __dirname + '/schema/entity/*',
        'value-object/*'  : __dirname + '/schema/value-object/*'
      }
    },
    locator:
    {
      'domain/aggregate/*' : __dirname + '/aggregate/*'
    }
  }
}
