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

- controller
  - index.js
- view
  - index.hbs
  - layout.hbs
- config.js
- index.js

#### config.js

```js
module.exports =
{
  bootstrap:
  {
    partials:
    {
      'layout' : 'view/layout'
    }
  },
  routes:
  [
    {
      view        : 'template',
      template    : 'view/index',
      dispatcher  : 'controller/index',
      policy      :
      {
        method    : 'get',
        path      : '/'
      }
    }
  ]
}
```

#### index.js

```js
const config = module.exports.config = require('./config')

require('@superhero/core').bootstrap(config.bootstrap).then((core) =>
  core.http(config.routes).listen(80))
```

#### controller/index.js

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

#### view/layout.hbs

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ title }} &lsaquo; Arex</title>

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

#### view/index.hbs

```html
{{#> layout title="Insert awesome title for the page here" }}
  <p>
    Write your markup here with support for variables, eg: "{{ foo }}"
  </p>
{{/ layout }}
```

## Support loading resources from filesystem

Add an entry to the routes array in the `config.js` file.

```js
module.exports =
{
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

- controller
  - index.js
- view
  - index.hbs
- public
  - resource
    - css
      - master.css
- config.js
- index.js

You can then request the `master.css` file through the request: `/resource/css/master.css`
