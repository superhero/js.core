class Configuration
{
  constructor(deepclone, deepmerge, deepfind)
  {
    this.deepclone  = deepclone
    this.deepmerge  = deepmerge
    this.deepfind   = deepfind
    this.config     = {}
  }

  extend(config)
  {
    const clone = this.deepclone.clone(config)
    this.config = this.deepmerge.merge(this.config, clone)
  }

  find(path)
  {
    return this.deepfind.find(path, this.config)
  }
}

module.exports = Configuration
