module.exports =
{
  eventbus:
  {
    observers:
    {
      'core.error' :
      [
        'console/observer/error'
      ],
      'core.warning' :
      [
        'console/observer/warning'
      ],
      'core.info' :
      [
        'console/observer/info'
      ]
    }
  }
}
