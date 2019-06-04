/**
 * @namespace Domain
 */
module.exports =
{
  core:
  {
    schema:
    {
      schema:
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
