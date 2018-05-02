module.exports =
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
      middleware  :
      [
        'controller/middleware-1',
        'controller/middleware-2'
      ]
    },
    {
      dispatcher  : '../controller/dispatcher/resource',
      policy      :
      {
        method    : 'get',
        path      : /^\/resource\/.*/
      }
    },
    {
      dispatcher  : '../controller/dispatcher/rest',
      policy      : '/rest'
    },
    {
      view        : 'raw',
      dispatcher  : 'controller/txt',
      policy      : '/test-raw'
    },
    {
      view        : 'json',
      dispatcher  : 'controller/obj',
      policy      : '/test-json'
    },
    {
      view        : 'template',
      template    : 'view/index',
      dispatcher  : 'controller/obj',
      policy      : '/test-templated'
    },
    {
      view        : 'template',
      template    : 'view/index',
      dispatcher  : 'controller/failing',
      policy      : '/test-failing'
    },
    {
      view        : 'template',
      template    : 'view/index',
      dispatcher  : 'controller/501',
      policy      : '/test-501'
    }
  ]
}
