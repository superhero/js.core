const
fs   = require('fs'),
path = require('path'),
root = path.dirname(require.main.filename)

module.exports = class
{
  fetchView(view)
  {
    return view && fs.existsSync(`${root}/${view}.js`)
    ? require.main.require(view)
    : view && fs.existsSync(`${__dirname}/../view/${view}.js`)
      ? require(`../view/${view}`)
      : require(`../view/json`)
  }

  fetchDispatcher(dispatcher)
  {
    if(dispatcher && fs.existsSync(`${root}/${dispatcher}.js`))
      return require.main.require(dispatcher)

    throw dispatcher
    ? 'the defined dispatcher does not exist'
    : 'the route does not define a dispatcher'
  }
}
