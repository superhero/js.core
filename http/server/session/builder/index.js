const Cookies = require('cookies')

class SessionBuilder
{
  build(request, response, domain)
  {
    let cookies

    const session =
    {
      domain,

      request,

      response,

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
