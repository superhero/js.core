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
        'entity/calculation'  : __dirname + '/schema/entity/calculation',
        'value-object/id'     : __dirname + '/schema/value-object/id'
      }
    },
    locator:
    {
      'domain/aggregate/*' : __dirname + '/aggregate/*'
    }
  }
}
