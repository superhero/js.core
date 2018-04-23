const
fs   = require('fs'),
path = require('path'),
root = path.dirname(require.main.filename)

module.exports = (dispatcher) =>
{
  try
  {
    require.resolve(`${root}/${dispatcher}`)
  }
  catch(error)
  {
    if(error.code === 'MODULE_NOT_FOUND')
      return require.main.require(dispatcher)

    else
      throw error
  }

  return require(`${root}/${dispatcher}`)
}
