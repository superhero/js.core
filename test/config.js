module.exports = Object.freeze(
{
  routes:
  [
    {
      chain     :
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
    }
  ]
})
