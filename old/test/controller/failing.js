const
root = require.main.exports.root,
Dispatcher = require(`${root}/controller/dispatcher`)

module.exports = class extends Dispatcher
{
  dispatch()
  {
    throw '<- Not an internal server eror. Expected to be trown and tested'
  }
}
