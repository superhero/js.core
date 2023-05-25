class SessionBuilder
{
  build(request, response, domain, viewModel)
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
              viewModel.headers['Set-Cookie'] = `${name}=${encodeURIComponent(value)}`
            }
          }
      }
    }

    return session
  }
}

module.exports = SessionBuilder
