const path = require('path')

class Path
{
  constructor()
  {
    const
    filename  = require.main.filename,
    dirname   = path.dirname(filename)

    this.main = { filename, dirname }
  }

  isResolvable(filename)
  {
    try
    {
      require.resolve(filename)
      return true
    }
    catch (error)
    {
      return false
    }
  }
}

module.exports = Path
