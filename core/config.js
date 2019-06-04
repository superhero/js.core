module.exports =
{
  core:
  {
    eventbus:
    {
      observers:
      {
        'core.error' :
        [
          'core/console/observer/error'
        ],
        'core.warning' :
        [
          'core/console/observer/warning'
        ],
        'core.info' :
        [
          'core/console/observer/info'
        ]
      }
    }
  }
}
