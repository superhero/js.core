module.exports =
{
  eventbus:
  {
    observers:
    {
      'foobar' :
      [
        'test/observer/foobar'
      ]
    }
  },
  locator:
  {
    'test/observer/foobar' : __dirname
  }
}
