module.exports =
{
  mainDirectory : require('path').dirname(require.main.filename),

  view:
  {
    json  : __dirname + '/view/json',
    raw   : __dirname + '/view/raw'
  },

  server:
  {
    http  : __dirname + '/controller/server/http',
    https : __dirname + '/controller/server/https',
  }
}
