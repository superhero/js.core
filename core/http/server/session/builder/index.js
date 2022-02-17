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
        : cookies = 
          {
            get(name)
            {
              const cookies = (request.headers.cookie || '').split(';')
              for(const cookie of cookies)
              {
                const pair = cookie.split('=')
                if(pair[0].trim() === name && pair[1])
                {
                  return decodeURIComponent(pair[1])
                }
              }
            },
            set(name, value)
            {
              throw new Error('cookie can not be set, functionality not yet implemented, raise an issue on github if you need it')
            }
          }
      }
    }

    return session
  }
}

module.exports = SessionBuilder
