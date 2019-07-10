class HttpServerRouteBuilderBootstrap
{
  constructor(configuration, locator)
  {
    this.configuration  = configuration
    this.locator        = locator
  }

  bootstrap()
  {
    const
    routeBuilder  = this.locator.locate('core/http/server/route/builder'),
    dtoBuilders   = this.configuration.find('core.http.server.route.builder.dto.builders')

    for(const dtoBuilderName in dtoBuilders)
    {
      const dtoBuilder = this.locator.locate(dtoBuilders[dtoBuilderName])
      routeBuilder.addDtoBuilder(dtoBuilder)
    }
  }
}

module.exports = HttpServerRouteBuilderBootstrap
