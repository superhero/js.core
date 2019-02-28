# Core

Licence: [MIT](https://opensource.org/licenses/MIT)

---

[![npm version](https://badge.fury.io/js/%40superhero%2Fcore.svg)](https://badge.fury.io/js/%40superhero%2Fcore)

- A core framework I use when developing in nodejs.
- The framework is designed to have little to no production dependencies.
- The framework offers solutions for different topics.
- The vision of the framework is to offer a code structure to the developer that will help you develop and separate responsibility through an OOP approach.

## Addons

Consider extending the framework with one or multiple plugins where the extra functionality is required:  
*Please note; you should use matching versions for core and the plugins by major and future releases*

- [Core.Handlebars](http://github.com/superhero/js.core.handlebars)
- [Core.Resource](http://github.com/superhero/js.core.resource)
- [Core.Websocket](http://github.com/superhero/js.core.websocket)

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

A simple example application to get started.

### Example Application › File structure

```
App
├── foo
│   ├── config.js
│   └── endpoint.js
├── bar
│   ├── config.js
│   └── endpoint.js
├── baz
│   ├── config.js
│   ├── index.js
│   └── locator.js
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

#### `index.js`

```js
const
CoreFactory = require('@superhero/core/factory'),
coreFactory = new CoreFactory,
core        = coreFactory.create()

core.add('foo')
core.add('bar')
core.add('baz')

core.server('server/http').listen(80)
```

---
#### to be continued...
