module.exports =
{
  locator:
  {
    'http/dispatcher/chain'               : __dirname + '/dispatcher/chain',
    'http/dispatcher/collection/builder'  : __dirname + '/dispatcher/collection/builder',
    'http/request/builder'                : __dirname + '/request/builder',
    'http/route/builder'                  : __dirname + '/route/builder',
    'http/session/builder'                : __dirname + '/session/builder',
    'http/view/json'                      : __dirname + '/view/json',
    'http/view/text'                      : __dirname + '/view/text',
    'http'                                : __dirname
  },
  http:
  {
    timeout: 4e3
  }
}
