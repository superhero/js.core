class CoreCrypto
{
  constructor(crypto)
  {
    this.crypto = crypto
  }

  hash(sha, data, digest)
  {
    var shasum = this.crypto.createHash(sha)
    shasum.update(data)
    shasum.digest(digest)

    return shasum
  }
}

module.exports = CoreCrypto
