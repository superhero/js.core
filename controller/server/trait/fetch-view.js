const
fs   = require('fs'),
path = require('path'),
root = path.dirname(require.main.filename)

module.expports = (view) =>
{
  return view && fs.existsSync(`${root}/${view}.js`)
  ? require.main.require(view)
  : view && fs.existsSync(`${__dirname}/../../view/${view}.js`)
    ? require(`../../view/${view}`)
    : require(`../../view/json`)
}
