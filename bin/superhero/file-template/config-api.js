module.exports = (ns) =>
`/**
 * @namespace ${ns}
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
          'json-view':
          {
            view : 'core/http/server/view/json'
          },
          'example':
          {
            url         : '/v1/example',
            method      : 'get',
            endpoint    : 'api/endpoint/example',
            input       : 'event/requested-example',
            output      : 'event/-eventlog-result'
          }
        }
      }
    },
    eventbus:
    {
      observers:
      {
        'example' : { 'observer/example' : true }
      }
    },
    locator:
    {
      'observer/*' : __dirname + '/observer/*'
    }
  }
}
`
