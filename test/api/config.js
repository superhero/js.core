module.exports =
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
          endpoint: 'api/endpoint/create-calculation'
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
  authentication:
  {
    apikey : 'ABC123456789'
  }
}
