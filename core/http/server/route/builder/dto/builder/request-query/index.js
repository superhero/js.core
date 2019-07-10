class HttpServerRouteBuilderDtoBuilderRequestQuery
{
  build(dto, route, request)
  {
    for(const key in request.query)
    {
      dto[key] = request.query[key]
    }
  }
}

module.exports = HttpServerRouteBuilderDtoBuilderRequestQuery
