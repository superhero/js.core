class Configuration
{
  constructor(deepcopy, deepmerge)
  {
    this.deepcopy   = deepcopy
    this.deepmerge  = deepmerge
    this.config     = {}
  }

  extend(config)
  {
    const copy  = this.deepcopy.copy(config)
    this.config = this.deepmerge.merge(this.config, copy)
  }
}

module.exports = Configuration
