class HttpServerRouteBuilderDtoBuilderRequestBody
{
  build(dto, route, request)
  {
    for(const key in request.body)
    {
      dto[key] = request.body[key]
    }
  }
}

module.exports = HttpServerRouteBuilderDtoBuilderRequestBody
