module.exports =
{
  eventbus:
  {
    observers:
    {
      'calculator.calculation-created'  : [ 'logger' ],
      'calculator.calculation-appended' : [ 'logger' ]
    }
  },
  locator:
  {
    'logger' : __dirname
  }
}
