module.exports =
{
  core:
  {
    bootstrap:
    {
      'process' : 'core/process/bootstrap'
    },
    locator:
    {
      'core/process'           : __dirname,
      'core/process/bootstrap' : __dirname + '/bootstrap'
    }
  }
}
