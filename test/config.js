module.exports =
{
  server:
  {
    http:
    {
      routes:
      {
        'test-foo':
        {
          action  : '/test/foo',
          endpoint: 'test/endpoint'
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
}
