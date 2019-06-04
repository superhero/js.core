module.exports =
{
  core:
  {
    locator:
    {
      'core/http/server/dispatcher/chain'                : __dirname + '/dispatcher/chain',
      'core/http/server/dispatcher/collection/builder'   : __dirname + '/dispatcher/collection/builder',
      'core/http/server/request/builder'                 : __dirname + '/request/builder',
      'core/http/server/route/builder'                   : __dirname + '/route/builder',
      'core/http/server/session/builder'                 : __dirname + '/session/builder',
      'core/http/server/view/json'                       : __dirname + '/view/json',
      'core/http/server/view/stream'                     : __dirname + '/view/stream',
      'core/http/server/view/text'                       : __dirname + '/view/text',
      'core/http/server/view'                            : __dirname + '/view',
      'core/http/server'                                 : __dirname
    },
    http:
    {
      server:
      {
        timeout: 30e3
      }
    }
  }
}
