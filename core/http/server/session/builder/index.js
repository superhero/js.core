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
              _sameSite       : 'Strict',
              _isCookieGlobal : true,
              _keyPairs       : [],

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
                if(name  !== undefined
                && value !== undefined)
                {
                  lazyload._keyPairs.push(`${name}=${encodeURIComponent(value)}`)
                }

                viewModel.headers['Set-Cookie'] = lazyload._keyPairs.concat(lazyload.meta).join('; ')

                return true
              },
              get _meta()
              {
                const meta = []

                if(lazyload._domain)
                {
                  meta.push(`Domain=${lazyload._domain}`)
                }
                if(lazyload._expire)
                {
                  meta.push(`Expires=${lazyload._expire}`)
                }
                if(lazyload._maxAge || lazyload._maxAge === 0)
                {
                  meta.push(`Max-Age=${lazyload._maxAge}`)
                }
                if(lazyload._sameSite)
                {
                  meta.push(`SameSite=${lazyload._sameSite}`)
                }
                if(lazyload._isSecure)
                {
                  meta.push(`Secure`)
                }
                if(lazyload._isCookieGlobal)
                {
                  meta.push(`Path=/`)
                }
                if(lazyload._isHttpOnly)
                {
                  meta.push(`HttpOnly`)
                }

                return meta
              },
              isCookieGlobal(bool)
              {
                lazyload._isCookieGlobal = bool
                lazyload.set()
              },
              isHttpOnly(bool)
              {
                lazyload._isHttpOnly = bool
                lazyload.set()
              },
              isSecure(bool)
              {
                lazyload._isSecure = bool
                lazyload.set()
              },
              domain(domain)
              {
                lazyload._domain = domain
                lazyload.set()
              },
              expires(expire)
              {
                lazyload._expire = new Date(expire).toUTCString()
                lazyload.set()
              },
              maxAge(maxAge)
              {
                // the number of seconds until the cookie expires. A zero or negative number will expire the cookie immediately.
                lazyload._maxAge = parseInt(maxAge)
                lazyload.set()
              },
              sameSite(sameSite)
              {
                lazyload._sameSite = sameSite
                lazyload.set()
              }
            }
        }
      }

    return session
  }
}

module.exports = SessionBuilder
