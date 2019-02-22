class DeepCopy
{
  fast(obj)
  {
    return JSON.parse(JSON.parse(obj))
  }
}

module.exports = DeepCopy
