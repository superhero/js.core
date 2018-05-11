const
root = require.main.exports.root,
Dispatcher = require(`${root}/controller/dispatcher/multiplex`)

module.exports = class extends Dispatcher
{
  * dispatch()
  {
    let i = 0
    yield [ this.event.name, ++i ]
    yield [ this.event.name, ++i ]
    yield [ this.event.name, ++i ]
  }
}
