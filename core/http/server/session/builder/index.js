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
              _sameSite : 'Strict',
              _isCookieGlobal : true,

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
                if(name   === undefined
                || value  === undefined)
                {
                  return false
                }

                lazyload._name  = name
                lazyload._value = value

                viewModel.headers['Set-Cookie'] = `${name}=${encodeURIComponent(value)}`

                if(lazyload._domain)
                {
                  viewModel.headers['Set-Cookie'] += `; Domain=${lazyload._domain}`
                }
                if(lazyload._expire)
                {
                  viewModel.headers['Set-Cookie'] += `; Expires=${lazyload._expire}`
                }
                if(lazyload._maxAge || lazyload._maxAge === 0)
                {
                  viewModel.headers['Set-Cookie'] += `; Max-Age=${lazyload._maxAge}`
                }
                if(lazyload._sameSite)
                {
                  viewModel.headers['Set-Cookie'] += `; SameSite=${lazyload._sameSite}`
                }
                if(lazyload._isSecure)
                {
                  viewModel.headers['Set-Cookie'] += `; Secure`
                }
                if(lazyload._isCookieGlobal)
                {
                  viewModel.headers['Set-Cookie'] += `; Path=/`
                }
                if(lazyload._isHttpOnly)
                {
                  viewModel.headers['Set-Cookie'] += `; HttpOnly`
                }

                return true
              },
              isCookieGlobal(bool)
              {
                lazyload._isCookieGlobal = bool
                lazyload.set(lazyload._name, lazyload._value)
              },
              isHttpOnly(bool)
              {
                lazyload._isHttpOnly = bool
                lazyload.set(lazyload._name, lazyload._value)
              },
              isSecure(bool)
              {
                lazyload._isSecure = bool
                lazyload.set(lazyload._name, lazyload._value)
              },
              domain(domain)
              {
                lazyload._domain = domain
                lazyload.set(lazyload._name, lazyload._value)
              },
              expires(expire)
              {
                lazyload._expire = new Date(expire).toUTCString()
                lazyload.set(lazyload._name, lazyload._value)
              },
              maxAge(maxAge)
              {
                // the number of seconds until the cookie expires. A zero or negative number will expire the cookie immediately.
                lazyload._maxAge = parseInt(maxAge)
                lazyload.set(lazyload._name, lazyload._value)
              },
              sameSite(sameSite)
              {
                lazyload._sameSite = sameSite
                lazyload.set(lazyload._name, lazyload._value)
              }
            }
        }
      }

    return session
  }
}

module.exports = SessionBuilder
