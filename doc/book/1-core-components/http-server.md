# Http / Server

Use the http server component to listen to http network traffic on a specific port, shown below how to specify.

```js
core.locate('core/http/server').listen(80)
```

---

## Http / Server / Router

After a connection is established, we must define a configuration for the router component to know how to handle each request. Below is an example of a route.

```js
module.exports =
{
  core:
  {
    http:
    {
      server:
      {
        routes:
        {
          'foobar':
          {
            url         : '/foobar',
            method      : 'get',
            headers     :{'x-foo':'bar'},
            endpoint    : 'api/endpoint/foobar',
            middleware  :['api/middleware/foobar'],
            view        : 'core/http/server/view/json',
            input       : 'dto/query-foobar',
            output      : 'entity/foobar'
          }
        }
      }
    }
  }
}
```

It is possible, and probably expected, that multiple routes are defined in this scope. Which route is to be used depends on a set of validation rules.

Each variable is exaplained below, what they mean and do in the context of routing.

---

### `url`

**The `url` variable is a routing variable. A matching url is required when validating to use the defined route.**

The url is the requested filepath, by example; in the http request `http://example.com/foobar?baz=qux`, the filepath, the `url` variable, is the `/foobar` segment.

It is possible to use some regular expressions, regex, in the `url` variable to accomplish a dynamic match. But it is considered by this documentaion regarded as good practice to not use any regex, but instead name segments as described below.

Naming segments in the url can be done in the following way; `/foobar/:baz`, where the `:baz` key is replaced with a regex; `[^/]+`, matching anything but the `/`, the forward slash. Naming a segment is useful for semantikal reasons, but more importantly, named segments are also recognized when composing the dto, **D**ata **T**ransfer **O**bject, as explained under the title `input` below.

It is possible to assign an expected value for a named segment in the url. Instead of replacing the segment with the regex `[^/]+`, the expected value would be used. Example: `/foobar/:baz=qux` would match with the string `/foobar/qux`.

---

### `method`

**The `method` variable is a routing variable. A matching url is required when validating to use the defined route.**

Every http request defines a request method, HTTP verbs, which indicates a desired operation accociated for an endpoint, or a resource.

Examples of a method commonly used in http api design, in restful design, is `GET`, `PUT`, `POST` and `DELETE`.

The `method` variable is matched case insensitive.

---

### `headers`

**The `headers` variable is a routing variable. A matching url is required when validating to use the defined route.**

In an http request, it is possible to specify headers, the framework allows developers to route based on the value of one or several of the request headers.

It is possible to match the value of the headers value with regex syntax, shown in below route example:

```js
{
  url       : '/foobar',
  method    : 'get',
  headers   :
  {
    'x-foo' : 'foo',
    'x-bar' : 'b.+'
  },
  endpoint  : 'api/endpoint/foobar',
  input     : 'dto/example',
  output    : false
}
```

The `headers` variables are always matched case insensitive.

---

### `endpoint`

**When a request is validated to a matching route**, the `endpoint` variable is used as a reference to the dispatcher that will be constructed and used to dispatch the request.

Below is an example of a dispatcher that simply replies with a `Hello World` string.

```js
const Dispatcher = require('superhero/core/http/server/dispatcher')

class Endpoint extends Dispatcher
{
  dispatch()
  {
    this.view.body = 'Hello World'
  }
}

module.exports = Endpoint
```

The `dispatch` method will be awaited, as such; the `dispatch` method be defined with the keyword `async`, if the dispatcher is required to work with asynchronous logic.

---

### `middleware`

**When a request is validated to a matching route**, the `middleware` variable is used as a reference to a chain of dispatchers that will be constructed and used to perform pre or post dispatcher operations  related to the request.

Below is an example of a middleware dispatcher that simply logs timestamps in between the requests.

```js
const Dispatcher = require('superhero/core/http/server/dispatcher')

class Middleware extends Dispatcher
{
  async dispatch(next)
  {
    console.log(Date.now())

    await next()

    console.log(Date.now())
  }
}

module.exports = Middleware
```

As seen in the above, we use the same dispatcher for the endpoint dispatcher as we use for the middleware dispatcher. The difference is the passed along `next` function that the implementation must call to trigger the next instance in the dispatcher chain, that finally will call the endpoint, where the chain will collaps on it self as described below.

```
Middleware
  ↓    ↑
Middleware
  ↓    ↑
 Endpoint
```

Worth noting, the post operations will be done in reveresed order to the pre operations due to the collapsed flow.

---

### `view`

**When a request is validated to a matching route**, the `view` variable is used as a reference to a presenter that will be used to render the output.

The framework uses by default the view called `core/http/server/view`, which will simply output the `view.body`, defined by the dispatcher process, as a string to the output.

Additionally view presenters are the following:

- `core/http/server/view/json`
- `core/http/server/view/stream`
- `core/http/server/view/text`

The framework also allows for external resources to be used by reference; `@superhero/core.handlebars`, which is publiched on npm, is such an example.

---

### `input`

**When a request is validated to a matching route**, the `input` variable is used as a reference to a schema that will be used as a template for the dto.

The dto is a merged, filtered and validated set of data, recognized by the router. Data can be sent as a query variable, sent in the message body, or mapped in the url segments.

The hiearky of the merged data model is `body`
**→** `query` **→** `url segment`, where the last overwrites the former.

It is possible to extend the route builder model by adding an additional dto builder to the list of builders in the configuration.

```js
{
  core:
  {
    http:
    {
      server:
      {
        route:
        {
          builder:
          {
            dto:
            {
              builders:
              {
                'key' : 'service'
              }
            }
          }
        }
      }
    }
  }
}
```

The example above is an abstract defintion of how to add a builder. The key is a unique identifier, designed by a unique index to be able to write over an already existing builder, for what ever reason that would be necessery. The "service" expressed in the value is the service name that will be located by the `core/locator` component.

A builder is expected to implement the `HttpServerRouteBuilderDtoBuilder` contract.

---

### `output`

The optional variable `output` is a reference to a schema that is used for automated generation of documentation, but could also be used in other contexts, such as in a middleware to validate that the the output is as expected.

---

## Route termination

When a request is made, a route walk is begun to find matching routes. The walk will end when a terminating valid route has been found. What defines a terminating route is when a valid route has an endpoint defined. This behavior allows a route building process where multiple valid routes can be merged together as one, as the following example shows.

```js
module.exports =
{
  core:
  {
    http:
    {
      routes:
      {
        'json-view':
        {
          view        : 'core/http/server/view/json'
        },
        'log':
        {
          middleware  :['api/middleware/logger']
        },
        'foo':
        {
          url         : '/foo',
          method      : 'get',
          endpoint    : 'api/endpoint/foo',
          input       : 'dto/query-foo',
          output      : 'entity/foo'
        },
        'bar':
        {
          url         : '/bar',
          method      : 'get',
          endpoint    : 'api/endpoint/bar',
          input       : 'dto/query-bar',
          output      : 'entity/bar'
        },
        '404':
        {
          endpoint    : 'api/endpoint/not-found',
          input       : false
        }
      }
    }
  }
}
```

In above example, both the routes `foo` and `bar` inherites the variable defintions; `view` - from the `json-view` route, and the `middleware` - from the `log` route.

More explicitly, if a request was made; `http://example.com/bar`, the composed view would look as the following example shows.

```js
{
  url         : '/bar',
  method      : 'get',
  endpoint    : 'api/endpoint/bar',
  middleware  :['api/middleware/logger'],
  view        : 'core/http/server/view/json',
  input       : 'dto/query-bar',
  output      : 'entity/bar'
}
```

While the request; `http://example.com/wtf/path`, will have no matching url and compose the following route.

```js
{
  endpoint    : 'api/endpoint/not-found',
  middleware  :['api/middleware/logger'],
  view        : 'core/http/server/view/json',
  input       : false
}
```
