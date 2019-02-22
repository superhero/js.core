const Cookies = require('cookies')

class ServerSessionBuilder
{
  build(request, response)
  {
    let cookies

    const session =
    {
      set cookies()
      {
        throw new Error('"cookies" can not be set on session, protected member')
      },

      get cookies()
      {
        return cookies
        ? cookies
        : cookies = new Cookies(request, response)
      }
    }

    return session
  }
}

module.exports = ServerSessionBuilder
