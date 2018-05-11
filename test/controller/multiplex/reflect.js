const
root = require.main.exports.root,
Dispatcher = require(`${root}/controller/dispatcher/multiplex`)

module.exports = class extends Dispatcher
{
  * dispatch()
  {
    yield [ this.event.name, this.event.data ]
  }
}
