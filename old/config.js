module.exports =
{
  main:
  {
    dirname : require('path').dirname(require.main.filename)
  },

  module:
  {
    object  : __dirname + '/object',
    server  : __dirname + '/server',
    view    : __dirname + '/view'
  },

  view:
  {
    json    : __dirname + '/view/json',
    stream  : __dirname + '/view/stream'
  },

  server:
  {
    http    : __dirname + '/server/http',
    https   : __dirname + '/server/https'
  }
}
