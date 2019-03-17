module.exports =
{
  bootstrap:
  {
    'eventbus' : 'eventbus/bootstrap'
  },
  locator:
  {
    'eventbus'            : __dirname,
    'eventbus/bootstrap'  : __dirname + '/bootstrap'
  },
  eventbus:
  {
    options   : {},
    observers : {}
  }
}
