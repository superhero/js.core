const deepmerge = require('deepmerge')
module.exports = class
{
  merge(a, b)
  {
    const c = deepmerge(a, b)
    for(const k in c)
      a[k] = c[k]
  }
}
