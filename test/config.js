module.exports =
{
  bootstrap:
  {
    partials:
    {
      'layout' : 'view/layout'
    }
  },
  routes:
  [
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
