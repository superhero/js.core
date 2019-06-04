class DeepFind
{
  find(path, obj)
  {
    // split on "." or "/"
    const keys = path.split(/\.|\//)
    return keys.reduce((obj, key) => obj && obj[key], obj)
  }
}

module.exports = DeepFind
