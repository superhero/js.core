class Configuration
{
  constructor(deepcopy, deepmerge, deepfind)
  {
    this.deepcopy   = deepcopy
    this.deepmerge  = deepmerge
    this.deepfind   = deepfind
    this.config     = {}
  }

  extend(config)
  {
    const copy  = this.deepcopy.fast(config)
    this.config = this.deepmerge.merge(this.config, copy)
  }

  find(path)
  {
    return this.deepfind.find(path, this.config)
  }
}

module.exports = Configuration
