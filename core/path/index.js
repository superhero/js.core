const 
  path = require('path'),
  fs   = require('fs')

class Path
{
  constructor()
  {
    const
    filename  = require.main.filename,
    dirname   = this.dirname(filename)

    this.main = { filename, dirname }
  }

  /**
   * @see require.resolve
   */
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

  directories(directoryPath)
  {
    const 
      dirents     = fs.readdirSync(directoryPath, { withFileTypes:true }),
      directories = []
  
    for(const dirent of dirents)
    {
      if(dirent.isDirectory())
      {
        directories.push(dirent.name)
      }
    }

    return directories
  }

  /**
   * @see path.dirname
   */
  dirname(filename)
  {
    return path.dirname(filename)
  }

  /**
   * @see path.normalize
   */
  normalize(filename)
  {
    return path.normalize(filename)
  }

  /**
   * @see path.extname
   */
  extension(filename)
  {
    return path.extname(filename)
  }

  /**
   * @see path.isAbsolute
   */
  isAbsolute(filename)
  {
    return path.isAbsolute(filename)
  }
}

module.exports = Path
