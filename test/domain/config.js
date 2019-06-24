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
        'entity/calculation' : __dirname + '/schema/entity/calculation'
      }
    },
    locator:
    {
      'domain/aggregate/calculator' : __dirname + '/aggregate/calculator'
    }
  }
}
