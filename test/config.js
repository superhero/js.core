module.exports = Object.freeze(
{
  bootstrap:
  {
    template:
    {
      helpers:
      {
        'calculate'       : true,
        'concat'          : true,
        'dateformat'      : true,
        'escDoubleQuote'  : true,
        'escSingelQuote'  : true,
        'if'              : true,
        'jsonStringify'   : true,
        'stripTags'       : true,
        'toFixed'         : true,
        'toLowerCase'     : true,
        'toUpperCase'     : true
      },
      partials:
      {
        'layout' : 'view/layout'
      }
    }
  },
  routes:
  [
    {
      chain       :
      [
        'controller/middleware-1',
        'controller/middleware-2'
      ]
    },
    {
      endpoint    : '../controller/dispatcher/resource',
      policy      :
      {
        method    : 'get',
        path      : /^\/resource\/.*/
      }
    },
    {
      endpoint    : '../controller/dispatcher/rest',
      policy      : '/rest'
    },
    {
      view        : 'raw',
      endpoint    : 'controller/txt',
      policy      : '/test-raw'
    },
    {
      view        : 'json',
      endpoint    : 'controller/obj',
      policy      : '/test-json'
    },
    {
      view        : 'template',
      template    : 'view/index',
      endpoint    : 'controller/obj',
      policy      : '/test-templated'
    },
    {
      view        : 'template',
      template    : 'view/index',
      endpoint    : 'controller/failing',
      policy      : '/test-failing'
    },
    {
      view        : 'template',
      template    : 'view/index',
      endpoint    : 'controller/501',
      policy      : '/test-501'
    }
  ]
})
