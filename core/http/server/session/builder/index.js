class SessionBuilder
{
  build(request, response, domain, viewModel)
  {
    let lazyload

    const 
      cookies = {},
      session =
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
          return lazyload
          ? lazyload
          : lazyload = 
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
              set(name, value, { isCookieGlobal=true, isHttpOnly, isSecure, domain, expire, maxAge, sameSite='Strict' } = {})
              {
                if(name  === undefined
                || value === undefined)
                {
                  return
                }

                const cookie = [ `${name}=${encodeURIComponent(value)}` ]

                if(domain)
                {
                  cookie.push(`Domain=${domain}`)
                }
                if(expire)
                {
                  expire = new Date(expire).toUTCString()
                  cookie.push(`Expires=${expire}`)
                }
                if(maxAge || maxAge === 0)
                {
                  // The number of seconds until the cookie expires. 
                  // A zero or negative number will expire the cookie immediately.
                  cookie.push(`Max-Age=${parseInt(maxAge)}`)
                }
                if(sameSite)
                {
                  cookie.push(`SameSite=${sameSite}`)
                }
                if(isSecure)
                {
                  cookie.push(`Secure`)
                }
                if(isCookieGlobal)
                {
                  cookie.push(`Path=/`)
                }
                if(isHttpOnly)
                {
                  cookie.push(`HttpOnly`)
                }

                viewModel.headers['Set-Cookie'] = [ viewModel.headers['Set-Cookie'], cookie.join('; ') ].filter(Boolean)

                return true
              }
            }
        }
      }

    return session
  }
}

module.exports = SessionBuilder
