module.exports =
{
  core:
  {
    eventbus:
    {
      observers:
      {
        'core.error'    : { 'core/console/observer/error'   : true },
        'core.warning'  : { 'core/console/observer/warning' : true },
        'core.info'     : { 'core/console/observer/info'    : true }
      }
    }
  }
}
