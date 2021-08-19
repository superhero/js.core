class CoreCrypto
{
  constructor(crypto)
  {
    this.crypto = crypto
  }

  /**
   * @param {string} sha 
   * @param {string|Buffer} data 
   * @param {string} digest 
   * 
   * @returns {string}
   */
  hash(sha, data, digest)
  {
    const hash = this.crypto.createHash(sha)
    hash.update(data)
    const digested = hash.digest(digest)

    return digested
  }
}

module.exports = CoreCrypto
