module.exports =
{
  core:
  {
    bootstrap:
    {
      'eventbus' : 'core/eventbus/bootstrap'
    },
    locator:
    {
      'core/eventbus'            : __dirname,
      'core/eventbus/bootstrap'  : __dirname + '/bootstrap'
    },
    eventbus:
    {
      options   : {},
      observers : {}
    }
  }
}
