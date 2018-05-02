const
root = require.main.exports.root,
Dispatcher = require(`${root}/controller/dispatcher`)

module.exports = class extends Dispatcher
{
  dispatch()
  {
    throw new Error('expected error')
  }
}
