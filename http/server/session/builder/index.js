const Cookies = require('cookies')

class SessionBuilder
{
  build(request, response)
  {
    let cookies

    const session =
    {
      set cookies(value)
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

module.exports = SessionBuilder
