module.exports = (ns) =>
`/**
 * @namespace ${ns}
 */
module.exports =
{
  core:
  {
    locator:
    {
      'repository/*' : __dirname + '/*'
    }
  }
}
`
