const fs = require('fs')

class Fs
{
  /**
   * @param {string} wd   Working directory
   * @param {string} cli  Command line interface
   */
  constructor(wd, cli)
  {
    this.wd  = wd
    this.cli = cli
  }

  mkdir(dir)
  {
    this.cli.write(' Creating path: ' + dir, 'green')
    const path = this.wd + '/' + dir
    fs.mkdirSync(path, { recursive: true })
  }

  writeFile(file, content)
  {
    const
    path        = this.wd + '/' + file,
    file_exists = fs.existsSync(path)

    if(file_exists)
    {
      this.cli.write(' Existing file: ' + file, 'red')
    }
    else
    {
      this.cli.write(' Creating file: ' + file, 'green')
      fs.writeFileSync(path, content)
    }
  }
}

module.exports = Fs
