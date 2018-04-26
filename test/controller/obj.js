const
root = require.main.exports.root,
Dispatcher = require(`${root}/controller/dispatcher`)

module.exports = class extends Dispatcher
{
  dispatch()
  {
    const vm =
    {
      body :
      {
        foobar  : 'bazqux',
        test    :
        {
          foo : 'bar',
          baz : 'qux'
        }
      }
    }

    return vm
  }
}
