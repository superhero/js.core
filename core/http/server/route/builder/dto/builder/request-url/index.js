class HttpServerRouteBuilderDtoBuilderRequestUrl
{
  build(dto, route, request)
  {
    const
    requestUrl  = request.url.split('/'),
    routeUrl    = route.url.split('/')

    for(const i in routeUrl)
    {
      const segment = routeUrl[i]

      if(segment.startsWith(':'))
      {
        const key = segment.split('=').shift().slice(1)
        dto[key] = requestUrl[i]
      }
    }
  }
}

module.exports = HttpServerRouteBuilderDtoBuilderRequestUrl
