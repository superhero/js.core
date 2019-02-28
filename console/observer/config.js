module.exports =
{
  eventbus:
  {
    observers:
    {
      'core.error' :
      [
        'console/observer'
      ]
    }
  },
  locator:
  {
    'console/observer' : __dirname
  }
}
