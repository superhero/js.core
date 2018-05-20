# Core

Licence: [MIT](https://opensource.org/licenses/MIT)

---

[![npm version](https://badge.fury.io/js/%40superhero%2Fcore.svg)](https://badge.fury.io/js/%40superhero%2Fcore)

A core module I use to bootstrap my applications. This module helps me setup a server, structure my code into a clear MVC folder structure as well as declaring routes and endpoints.

## Install

`npm install @superhero/core`

...or just set the dependency in your `package.json` file:

```json
{
  "dependencies":
  {
    "@superhero/core": "*"
  }
}
```

## Example Application

A simple example to get started follows.

### Example Application › File structure

```
App
├── controller
│   ├── foobar.js
│   └── logger.js
├── config.js
├── index.js
└── package.json
```

#### `package.js`

```js
{
  "name": "Super Duper App",
  "version": "0.0.1",
  "description": "An example meant to describe the libraries fundamentals",
  "license": "MIT",
  "dependencies": {
    "@superhero/core": "*"
  }
}

```

#### `config.js`

See the section: [Routing](#routing), for more information.

```js
module.exports =
{
  routes:
  [
    {
      endpoint  : 'controller/foobar',
      chain     : 'controller/logger',
      policy    :
      {
        method  : 'get',
        path    : '/'
      }
    }
  ]
}
```

#### `index.js`

```js
const config = require('./config')
require('@superhero/core').server('http', config.routes, config).listen(80)
```

#### `controller/foobar.js`

```js
const Dispatcher = require('@superhero/core/controller/dispatcher')

module.exports = class extends Dispatcher
{
  async dispatch()
  {
    // Building a view model that's used by the view
    const vm =
    {
      body:
      {
        foo : 'bar'
      }
    }

    // Return the view model to be passed through the dispatcher chain to
    // finally be passed to the view
    return vm
  }
}
```

#### `controller/logger.js`

```js
const Dispatcher = require('@superhero/core/controller/dispatcher')

let i = 0

// Middleware dispatcher
// Inherits the same interface and functionality as an endpoint dispatcher
module.exports = class extends Dispatcher
{
  // A simple logger that writes a timestamp to the console on in and out
  async dispatch(next)
  {
    const n = ++i

    console.log('i', n, new Date().toISOString())

    const vm = next()

    console.log('o', n, new Date().toISOString())

    return vm
  }
}
```

## Bootstrap

The bootstrap process is meant to run once, before anything else in the application.
It's an optional process that's only required for using addons.

## Routing

The route process will go through each entity and push every match to an array. Then flatten the object up to where the first endpoint is found.

### Routing › Example

**input**

```js
[
  {
    view      : 'json',
    chain     : 'auth'
  },
  {
    view      : 'raw',
    endpoint  : 'controller1',
    chain     :
    [
      'minification',
      'gzip'
    ],
    policy    :
    {
      method  : 'get',
      path    : '/'
    }
  },
  {
    endpoint  : 'controller2',
    policy    :
    {
      method  : 'post',
      path    : '/'
    }
  },
  {
    endpoint  : 'controller3',
    policy    : '/'
  },
  {
    endpoint  : 'controller4'
  }
]
```

**output `GET /`**

```js
{
  view      : 'raw',
  endpoint  : 'controller1',
  chain     :
  [
    'auth',
    'minification',
    'gzip'
  ],
  policy    :
  {
    method  : 'get',
    path    : '/'
  }
}
```

**output `POST /`**

```js
{
  view      : 'json',
  endpoint  : 'controller2',
  chain     : [ 'auth' ],
  policy    :
  {
    method  : 'post',
    path    : '/'
  }
}
```

**output `PUT /`**

```js
{
  view      : 'json',
  endpoint  : 'controller3',
  chain     : [ 'auth' ],
  policy    : '/'
}
```

**output `GET /what-ever`**

```js
{
  view      : 'json',
  endpoint  : 'controller4',
  chain     : [ 'auth' ]
}
```

#### Routing › Endpoint
*optional*

The endpoint is what defines what the router is looking for to confirm a route has been located. If no endpoint is found, a `404 Not Found` response will be returned.

#### Routing › Chain
*optional*

See the section: [Middleware](#middleware), for more information.

#### Routing › View
*optional*

See the section: [View](#view), for more information.

#### Routing › Policy
*optional*

The policy is what defines the validator process.

If no policy is defined, then the entity is considered valid. This way you can specify some default behavior for all routes.

If the policy object is a string instead of an object, it will be interpret as a `policy.path`.

##### Routing › Policy › Method
*optional*

The request method can be specified as a route specific.

##### Routing › Policy › Path
*optional*

The url path used in the request can be specified as a string or regular expression.

## View

The view defines how the content of the controller will be delivered.
A few core delivering systems already exists, such as:

- **json**
  - Stringifies the body of the view model
  - The default view used if none explicitly is specified
- **raw**
  - Simply return content as it is

What view to use can be set in the dispatched view model or in the route.

## Middleware

A middleware is the same as any other dispatcher, apart from the callback passed as an argument to the `dispatcher`. The callback is used to treat the next item in the [dispatcher chain](#middleware--dispatcher-chain).

A middleware can be specified in the routing process, see [Routing](#routing) section above for more information.

### Middleware › Example

```js
const Dispatcher = require('@superhero/core/controller/dispatcher')

module.exports = class extends Dispatcher
{
  async dispatch(next)
  {
    // Do stuff here that needs to be done BEFORE the endpoint
    // ...

    // The callback will call the next dispatcher in the chain until it returns
    // a view model by the endpoint
    const vm = await next()

    // Do stuff here that needs to be done AFTER the endpoint has been called
    // If you need to manipulate the view model or simply log that the request
    // has been performed
    // ...

    // Always return the view model
    return vm
  }
}
```

### Middleware › Dispatcher chain

When chaining dispatchers, **OBS!** The post handling will be handled in reversed order.

```
 LoggerMiddleware
    ↓        ↑
  AuthMiddleware
    ↓        ↑
EndpointDispatcher
```
