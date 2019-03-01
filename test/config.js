module.exports =
{
  eventbus:
  {
    observers:
    {
      'foobar' :
      [
        'test/observer/foobar'
      ]
    }
  },
  locator:
  {
    'test/observer/foobar' : __dirname + '/observer/foobar'
  },
  http:
  {
    routes:
    {
      'test-foo':
      {
        action  : '/test/foo',
        endpoint: 'test/endpoint',
      },
      'test-bar':
      {
        action  : '/test/bar',
        method  : 'get',
        endpoint: 'test/endpoint',
        chain   :
        [
          'test/middleware/one',
          'test/middleware/two'
        ]
      },
      'test-baz':
      {
        action  : '/test/baz',
        method  : 'get',
        endpoint: 'test/endpoint',
        chain   :
        [
          'test/middleware/one',
          'test/middleware/two'
        ],
        dto     :
        {
          'foo' : { 'query' : 'foo' },
          'bar' : { 'query' : 'bar' }
        }
      }
    }
  }
}
