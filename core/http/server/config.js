module.exports =
{
  core:
  {
    bootstrap:
    {
      'http/server/route/builder' : 'core/http/server/route/builder/bootstrap'
    },
    locator:
    {
      'core/http/server/dispatcher/chain'                         : __dirname + '/dispatcher/chain',
      'core/http/server/dispatcher/collection/builder'            : __dirname + '/dispatcher/collection/builder',
      'core/http/server/request/builder'                          : __dirname + '/request/builder',
      'core/http/server/route/builder/bootstrap'                  : __dirname + '/route/builder/bootstrap',
      'core/http/server/route/builder/dto/builder/request-body'   : __dirname + '/route/builder/dto/builder/request-body',
      'core/http/server/route/builder/dto/builder/request-query'  : __dirname + '/route/builder/dto/builder/request-query',
      'core/http/server/route/builder/dto/builder/request-url'    : __dirname + '/route/builder/dto/builder/request-url',
      'core/http/server/route/builder'                            : __dirname + '/route/builder',
      'core/http/server/session/builder'                          : __dirname + '/session/builder',
      'core/http/server/view/json'                                : __dirname + '/view/json',
      'core/http/server/view/stream'                              : __dirname + '/view/stream',
      'core/http/server/view/text'                                : __dirname + '/view/text',
      'core/http/server/view'                                     : __dirname + '/view',
      'core/http/server'                                          : __dirname
    },
    http:
    {
      server:
      {
        timeout: 30e3,
        route:
        {
          builder:
          {
            dto:
            {
              builders:
              {
                'request-body'  : 'core/http/server/route/builder/dto/builder/request-body',
                'request-query' : 'core/http/server/route/builder/dto/builder/request-query',
                'request-url'   : 'core/http/server/route/builder/dto/builder/request-url'
              }
            }
          }
        }
      }
    }
  }
}
