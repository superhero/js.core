module.exports =
{
  routes:
  [
    {
      chain :
      [
        'controller/middleware-1',
        'controller/middleware-2'
      ]
    },
    {
      endpoint  : '../controller/dispatcher/rest',
      policy    : '/rest'
    },
    {
      view      : 'raw',
      endpoint  : 'controller/txt',
      policy    : '/test-raw'
    },
    {
      view      : 'json',
      endpoint  : 'controller/obj',
      policy    : '/test-json'
    },
    {
      endpoint  : 'controller/failing',
      policy    : '/test-failing'
    },
    {
      endpoint  : 'controller/501',
      policy    : '/test-501'
    },
    {
      view      : 'raw',
    },
    {
      endpoint  : 'controller/route-arg-foo',
      policy    : '/test-route-arg-body',
      mapper    :
      {
        foo : { body:'foo' }
      }
    },
    {
      endpoint  : 'controller/route-arg-foo',
      policy    : '/test-route-arg-query',
      mapper    :
      {
        foo : { query:'foo' }
      }
    },
    {
      endpoint  : 'controller/route-arg-foo',
      policy    : '/bar/test-route-arg-segment',
      mapper    :
      {
        foo : { segment:0 }
      }
    },
    {
      endpoint  : 'controller/route-arg-foo',
      policy    : '/bar/test-route-arg-segment-by-number',
      mapper    :
      {
        foo : 0
      }
    },
    {
      view      : 'json',
      endpoint  : 'controller/route-enity',
      policy    : '/test-route-entity',
      mapper    :
      {
        foo : { body:'foo' },
        bar : { body:'bar' },
        baz : { body:'baz' }
      }
    }
  ]
}
