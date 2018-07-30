const deepmerge = require('deepmerge')
module.exports = class
{
  merge(a, b)
  {
    const c = deepmerge(a, b)
    Object.assign(a, c)
  }
}
