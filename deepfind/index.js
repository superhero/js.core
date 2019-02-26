class DeepFind
{
  find(path, obj)
  {
    const keys = path.split('.')
    return keys.reduce((obj, key) => obj && obj[key], obj)
  }
}

module.exports = DeepFind
