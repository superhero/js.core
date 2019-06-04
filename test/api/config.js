/**
 * @namespace Api
 */
module.exports =
{
  core:
  {
    http:
    {
      server:
      {
        routes:
        {
          'create-calculation':
          {
            url     : '/calculations',
            method  : 'post',
            endpoint: 'api/endpoint/create-calculation',
            view    : 'core/http/server/view/json'
          },
          'authentication':
          {
            middleware :
            [
              'api/middleware/authentication'
            ]
          },
          'append-calculation':
          {
            url     : '/calculations/.+',
            method  : 'put',
            endpoint: 'api/endpoint/append-calculation',
            view    : 'core/http/server/view/json',
            dto     :
            {
              'id'    : { 'url'   : 2 },
              'type'  : { 'body'  : 'type' },
              'value' : { 'body'  : 'value' }
            }
          }
        }
      }
    },
    eventbus:
    {
      observers:
      {
        'calculation created'  : [ 'api/observer/calculation-created/log'  ],
        'calculation appended' : [ 'api/observer/calculation-appended/log' ]
      }
    },
    locator:
    {
      'api/observer/calculation-created/log'  : __dirname + '/observer/calculation-created/log',
      'api/observer/calculation-appended/log' : __dirname + '/observer/calculation-appended/log'
    }
  }
}
