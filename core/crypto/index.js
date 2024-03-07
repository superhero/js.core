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

  /**
   * @param {string} data 
   * @param {string} salt 
   * @param {number} [iterations=10e3] 
   * @param {number} [keyLength=64] 
   * @param {string} [sha='sha512'] 
   * @param {string} [digest='hex'] 
   * 
   * @returns {string}
   */
  saltedHashWithItterations(data, salt, iterations=10e3, keyLength=64, sha='sha512', digest='hex')
  {
    const hash = this.crypto.pbkdf2Sync(data, salt, iterations, keyLength, sha)
    return hash.toString(digest)
  }

  /**
   * @param {number} [amountOfRandomBytes=32] 
   * @param {string} [digest='hex'] 
   * 
   * @returns {string}
   */
  randomBytes(amountOfRandomBytes=32, digest='hex')
  {
    return this.crypto.randomBytes(amountOfRandomBytes).toString(digest)
  }
}

module.exports = CoreCrypto
