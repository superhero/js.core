module.exports =
{
  locator:
  {
    'http/server/dispatcher/chain'                : __dirname + '/dispatcher/chain',
    'http/server/dispatcher/collection/builder'   : __dirname + '/dispatcher/collection/builder',
    'http/server/request/builder'                 : __dirname + '/request/builder',
    'http/server/route/builder'                   : __dirname + '/route/builder',
    'http/server/session/builder'                 : __dirname + '/session/builder',
    'http/server/view/json'                       : __dirname + '/view/json',
    'http/server/view/text'                       : __dirname + '/view/text',
    'http/server'                                 : __dirname
  },
  http:
  {
    server:
    {
      timeout: 4e3
    }
  }
}
