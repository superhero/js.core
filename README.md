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

## Application example

A simple example to get started follows

### File structure

```
App
├── controller
│   └── index.js
├── view
│   ├── index.hbs
│   └── layout.hbs
├── config.js
├── index.js
└── package.json
```

#### `package.js`

The library depends on a few optional external modules.
In this example we will use the "Template" view that's dependent on the "handlebars" module, as specified under "dependencies".

```js
{
  "name": "Super Duper App",
  "version": "0.0.1",
  "description": "An example meant to describe the libraries fundamentals",
  "license": "MIT",
  "dependencies": {
    "@superhero/core": "*",
    "handlebars": "4.0.11"
  }
}

```

#### `config.js`

```js
module.exports =
{
  // ... see "Bootstrap" section below for more information
  bootstrap:
  {
    template:
    {
      partials:
      {
        layout : 'view/layout'
      }
    }
  },
  // Here we specify what request is handled by what dispatcher
  routes:
  [
    {
      view        : 'template',
      template    : 'view/index',
      dispatcher  : 'controller/index',
      // The policy specification is related to the request
      // See "Routing" section below for more information
      policy      :
      {
        method    : 'get',
        path      : '/'
      }
    }
  ]
}
```

#### `index.js`

```js
const config = module.exports.config = require('./config')

require('@superhero/core').bootstrap(config.bootstrap).then((core) =>
  core.http(config.routes).listen(80))
```

#### `controller/index.js`

```js
const Dispatcher = require('@superhero/core/controller/dispatcher')

module.exports = class extends Dispatcher
{
  async dispatch()
  {
    return { body:{ foo:'bar' }}
  }
}
```

#### `view/layout.hbs`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ title }}</title>

    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>
    <main>
      {{> @partial-block }}
    </main>
  </body>
</html>
```

#### `view/index.hbs`

```html
{{#> layout title="Insert awesome title for the page here" }}
  <p>
    Write your markup here with support for variables, eg: "{{ foo }}"
  </p>
{{/ layout }}
```

## Bootstrap

The bootstrap process is meant to run once, before anything else in the application.
A few different settings can be set through this process, described below:

***relative-pathname*** *used in below description is represents a pathname relative to the the main directory of the application filename, eg:"require.main.filename"*

### Bootstrap Template View

```js
module.exports =
{
  bootstrap:
  {
    template:
    {
      helpers:
      {
        // The library has a few defined core helpers that can be activated
        // and used by through a truthful flag
        calculate       : true,
        concat          : true,
        dateformat      : false,  // "dateformat" requires an external module
        escDoubleQuote  : true,
        escSingelQuote  : true,
        if              : true,
        jsonStringify   : true,
        stripTags       : true,
        toFixed         : true,
        toLowerCase     : true,
        toUpperCase     : true,

        // You can add a custom helper by specify it's name and the path to the
        // exported function
        customHelper    : '*relative-pathname'
      }
      partials:
      {
        // You can register partials to be loaded and used through-out the
        // application, such as a layout, for instance...
        name : '*relative-pathname'
      }
    }
  },
  // ...
}
```

### Bootstrap Resource Dispatcher

```js
module.exports =
{
  bootstrap:
  {
    resource:
    {
      // You can change the public folder where the public resources are located
      origin : '*relative-pathname'
    }
  },
  // ...
}
```

## Routing

The route process will go through each entity and push every match to an array. Then flatten the object up to where the first dispatcher is found.

### Example

**input**

```js
[
  {
    view        : 'json',
    middleware  : 'auth'
  },
  {
    view        : 'raw',
    dispatcher  : 'controller1',
    middleware  :
    [
      'minification',
      'gzip'
    ],
    policy      :
    {
      method    : 'get',
      path      : '/'
    }
  },
  {
    dispatcher  : 'controller2',
    policy      :
    {
      method    : 'post',
      path      : '/'
    }
  },
  {
    dispatcher  : 'controller3',
    policy      : '/'
  },
  {
    dispatcher  : 'controller4'
  }
]
```

**output `GET /`**

```js
{
  view        : 'json',
  dispatcher  : 'controller1',
  middleware  :
  [
    'auth',
    'minification',
    'gzip'
  ],
  policy      :
  {
    method    : 'get',
    path      : '/'
  }
}
```

**output `POST /`**

```js
{
  view        : 'raw',
  dispatcher  : 'controller2',
  middleware  : [ 'auth' ],
  policy      :
  {
    method    : 'post',
    path      : '/'
  }
}
```

**output `PUT /`**

```js
{
  view        : 'json',
  dispatcher  : 'controller3',
  middleware  : [ 'auth' ],
  policy      : '/'
}
```

**output `GET /what-ever`**

```js
{
  view        : 'json',
  dispatcher  : 'controller4',
  middleware  : [ 'auth' ]
}
```

#### Dispatcher

The dispatcher is what defines an endpoint and what the router is looking for to confirm a route has been located. No dispatcher found will give a `404 Not Found` response.

#### Middleware

Specifying a "middleware" is optional.

See the section: "Middleware", for more information.

#### View

Specifying a "view" is optional.

See the section: "View", for more information.

#### Policy

The policy is what defines the validator process. If no policy is defined, then the entity is considered valid. This way you can specify some default behavior for all routes.
If the policy object is a string instead of an object, it will be interpret as a path.

##### Method

The request method can be specified as a route specific

##### Path

The url path used in the request can be specified as a string or regular expression.

## View

The view defines how the content of the controller will be delivered.
A few core delivering systems already exists, such as:

- **json**
  - Stringifies the body of the view model
  - The default view used if none explicitly is specified
- **raw**
  - Simply return content as it is
- **template**
  - Mostly used to render html content through a templating system

What view to use can be set in the dispatched view model or in the route.

## Middleware

A middleware is the same as any other dispatcher, apart from the callback passed as an argument to the `dispatcher`. The callback is used to treat the next item in the dispatcher chain.

A middleware can be specified in the routing process, see "Routing" section above for more information.

### Example

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

### Dispatcher chain

When chaining dispatchers, **OBS!** The post handling will be handled in reversed order.

```
 LoggerMiddleware
   ↓         ↑
  AuthMiddleware
   ↓         ↑
EndpointDispatcher
```

## Support loading resources from the file system

Add an entry to the routes array in the `config.js` file.

```js
module.exports =
{
 bootstrap:
 {
   resource:
   {
     // Optional setting
     // origin : 'public'
   }
 },
 // ...
 routes:
 [
   {
     view        : 'raw',
     dispatcher  : '@superhero/core/controller/dispatcher/resource',
     policy      :
     {
       method    : 'get',
       path      : /^\/resource\/.*/
     }
   },
   // ...
 ],
 // ...
}
```

...and add a public folder with the reflecting structure of your specified path pattern in the root directory. eg:

```
App
├── ...
├── public
│   └── resource
│       └── css
│           └── master.css
└── ...
```

You can then request the `master.css` file through the request: `/resource/css/master.css`
