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
    const copy  = this.deepcopy.fast(config)
    this.config = this.deepmerge.merge(this.config, copy)
  }

  /*
  find(path)
  {
    const paths = path.split('.')
    // reduce
    // this.config.
  }
  */
}

module.exports = Configuration
