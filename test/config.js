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
    }
  ]
}
