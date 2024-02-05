module.exports =
{
  core:
  {
    bootstrap:
    {
      'udp/server' : 'core/udp/server'
    },
    locator:
    {
      'core/udp/server' : __dirname
    },
    udp:
    {
      server:
      {
        router: {}
      }
    }
  }
}
