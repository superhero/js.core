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
            view    : 'core/http/server/view/json',
            input   : false
          },
          'header-test':
          {
            url     : '/header-test',
            method  : 'post',
            endpoint: 'api/endpoint/header-test-endpoint',
            view    : 'core/http/server/view/json',
            input   : 'entity/header-test',
            headers :
            {
              'x-foo' : '.+',
              'x-bar' : 'bar'
            }
          },
          'dto-test':
          {
            url     : '/dto-test',
            method  : 'post',
            endpoint: 'api/endpoint/dto-test-endpoint',
            view    : 'core/http/server/view/json',
            input   : 'entity/dto-test'
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
            url     : '/calculations/:id',
            method  : 'put',
            endpoint: 'api/endpoint/append-calculation',
            view    : 'core/http/server/view/json',
            input   : 'entity/calculation'
          }
        }
      }
    },
    eventbus:
    {
      observers:
      {
        'calculation created'  : { 'api/observer/calculation-created/log'  : true },
        'calculation appended' : { 'api/observer/calculation-appended/log' : true }
      }
    },
    locator:
    {
      'api/observer/calculation-created/log'  : __dirname + '/observer/calculation-created/log',
      'api/observer/calculation-appended/log' : __dirname + '/observer/calculation-appended/log'
    }
  }
}
