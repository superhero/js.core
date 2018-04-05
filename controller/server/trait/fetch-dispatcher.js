const
fs   = require('fs'),
path = require('path'),
root = path.dirname(require.main.filename)

module.expports = (dispatcher) =>
{
  if(dispatcher && fs.existsSync(`${root}/${dispatcher}.js`))
    return require.main.require('./' + dispatcher)

  throw dispatcher
  ? new Error('defined dispatcher does not exist')
  : new Error('route does not define a dispatcher')
}
