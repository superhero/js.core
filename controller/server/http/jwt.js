module.exports = (body) =>
{
  const tokens = body.split('.')

  if(tokens.length != 3)
  {
    const
    messg = `invalid amount of segments "${tokens.length}/3" in JWT body`,
    error = new Error(messg)

    error.code = 'ERR_INVALID_JWT'
    throw error
  }

  const
  header    = tokens[0],
  payload   = tokens[1],
  signature = tokens[2],
  jwt_dto   =
  {
    tokens,
    signature,
    header  : JSON.parse(base64UrlDecode(header)),
    payload : JSON.parse(base64UrlDecode(payload))
  }

  return jwt_dto
}

function base64UrlDecode(segment)
{
  segment = segment
    .replace(/\-/g, '+')
    .replace(/\_/g, '/')

  return Buffer.from(segment, 'base64') || '{}'
}
