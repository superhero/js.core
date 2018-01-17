const
fs      = require('fs'),
util    = require('util'),
path    = require('path'),
exists  = util.promisify(fs.access),
root    = path.dirname(require.main.filename)

module.exports = class
{
  async fetchView(view)
  {
    return view && await exists(`${root}/${view}.js`)
    ? require.main.require(view)
    : view && await exists(`${__dirname}/../view/${view}.js`)
      ? require(`../view/${view}`)
      : require(`../view/json`)
  }

  async fetchDispatcher(dispatcher)
  {
    if(dispatcher && await exists(`${root}/${dispatcher}.js`))
      return require.main.require(dispatcher)

    throw dispatcher
    ? 'the defined dispatcher does not exist'
    : 'the route does not define a dispatcher'
  }
}
