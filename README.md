# Core

Licence: [MIT](https://opensource.org/licenses/MIT)

---

[![npm version](https://badge.fury.io/js/%40superhero%2Fcore.svg)](https://badge.fury.io/js/%40superhero%2Fcore)

- A core framework I use when developing in nodejs.
- The framework is designed to have little to no production dependencies.
- The framework offers solutions for different topics, not necessarily an http server.
- The vision of the framework is to offer a code structure to the developer that will help to separate responsibilities in projects through an OOP approach.

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

An example application to get started, covering some recommended "best practices" regarding testing and docs generation.

The application is a calculator with very basic functionality. The aim with this application is not to make a good calculator. The aim is to show you, who is reading this, how different parts of the framework works, or are intended to work.

### Example Application › File structure

```
super-duper-app
├── docs
├── src
│   ├── api
│   │   ├── endpoint
│   │   │   ├── append-calculation.js
│   │   │   └── create-calculation.js
│   │   └── config.js
│   ├── calculator
│   │   ├── error
│   │   |   ├── calculation-could-not-be-found.js
│   │   |   └── invalid-calculation-type.js
│   │   ├── config.js
│   │   ├── index.js
│   │   └── locator.js
│   └── index.js
├── test
│   ├── test.calculations.js
│   ├── index.js
│   └── mocha.opts
├── .gitignore
├── package.json
└── README.md
```

#### `.gitignore`

```
docs/generated
npm-debug.log
node_modules
package-lock.json
.nyc_output
```

#### `package.js`

```js
{
  "name": "Super Duper App",
  "version": "0.0.1",
  "description": "An example meant to describe the libraries fundamentals",
  "license": "MIT",
  "main": "src/index.js",
  "author": {
    "name": "Erik Landvall",
    "email": "erik@landvall.se",
    "url": "http://erik.landvall.se"
  },
  "scripts": {
    "docs-coverage": "nyc report --reporter=html --report-dir=./docs/generated/coverage",
    "docs-tests": "mocha './test/*.test.js' --opts ./test/mocha.opts --reporter mochawesome --reporter-options reportDir=docs/generated/test,reportFilename=index,showHooks=always",
    "test": "nyc mocha './test/*.test.js' --opts ./test/mocha.opts"
  },
  "dependencies": {
    "@superhero/core": "*"
  },
  "devDependencies": {
    "mocha": "5.1.0",
    "mochawesome": "3.0.2",
    "chai": "4.1.2",
    "nyc": "11.7.1"
  }
}
```

#### `index.js`

```js
const
CoreFactory = require('@superhero/core/factory'),
coreFactory = new CoreFactory,
core        = coreFactory.create()

core.add('api')
core.add('calculator')
core.add('http/server')

core.load()

core.locate('bootstrap').bootstrap().then(() =>
core.locate('http/server').listen(9001))

module.exports = core
```

We start of by creating a core factory that will create the core object, central to our application. The core is designed to keep track of a global state related to it's context. You can create multiple cores if necessary, but normally it makes sens to only use one. This example will only use one core.

The next step is to add services that we will use in relation to the core context. Here we add `api` and `calculator` that exists in the file tree previously defined. You also notice that we add the service `http/server` that does not exist in the file tree we defined. The `http/server` service is located in the core, but may not always be necessary to load depending on the scope of your application, so you need to add the `http/server` service when you want to set up an http server.  
The framework will try to add services depending on a hierarchy of paths.

- First it will try to load in relation to your `main script`
- next it attempts by dependency defined in your `package.json` file
- and finally it will attempt to load related to the core library of existing services.  

*This hierarchy allows you, as a developer, to overwrite anything in the framework with custom logic.*

Next we load the core! This will eager load all the services previously added to the context.

By bootstrapping the core, we run a few scripts that needs to run for some modules to function properly. As a developer you can hook into this process in the modules you write.

And in the end, after we have added, loaded and bootstrapped the modules related to the context, we tell the server to listen to a specific port for network activity.

#### `src/api/config.js`

```js
module.exports =
{
  http:
  {
    server:
    {
      routes:
      {
        'create-calculation':
        {
          action  : '/calculations',
          method  : 'post',
          endpoint: 'api/endpoint/create-calculation'
        },
        'append-calculation':
        {
          action  : '/calculations/.+',
          method  : 'put',
          endpoint: 'api/endpoint/append-calculation',
          dto     :
          {
            'calculation-id'  : { 'path' : 4 },
            'type'            : { 'body' : 'type' },
            'value'           : { 'body' : 'value' }
          }
        }
      }
    }
  }
}
```

I have here chosen to set up a folder structure with one module called `api`. This module will contain all the endpoints. As such, the config file of this module will specify the router setting for these endpoints.

I set up two routes: `create-calculation` and `append-calculation`.

- The **action** attribute declares on what **url pathname** the route will be valid for.
- The **method** attribute declares on what **url method** the route will be valid for

#### `src/api/endpoint/create-calculation.js`

```js
const Dispatcher = require('@superhero/core/http/server/dispatcher')

class CreateCalculationEndpoint extends Dispatcher
{
  dispatch()
  {
    const
    calculator    = this.locator.locate('calculator'),
    calculationId = calculator.createCalculation()

    this.view.body.id = calculationId
  }
}

module.exports = CreateCalculationEndpoint
```

The `create calculation` endpoint is here defined.

- First we locate the `calculator` service.
- Next we create a calculation
- And finally we populate the `view model` with the returning calculation id

***OBS! it's possible to define the `dispatch` method as `async`. The framework will `await` for the method to finish***

#### `src/api/endpoint/append-calculation.js`

```js
const
Dispatcher    = require('@superhero/core/http/server/dispatcher'),
NotFoundError = require('@superhero/core/http/server/dispatcher/error/not-found'),
BadQueryError = require('@superhero/core/http/server/dispatcher/error/bad-query')

class AppendCalculationEndpoint extends Dispatcher
{
  dispatch()
  {
    const
    id          = this.route.dto.id,
    type        = this.route.dto.type,
    value       = this.route.dto.value,
    calculator  = this.locator.locate('calculator'),
    result      = calculator.appendToCalculation(id, type, value)

    this.view.body.result = result
  }

  onError(error)
  {
    switch(error)
    {
      case 'E_CALCULATION_COULD_NOT_BE_FOUND':
        throw new NotFoundError('Calculation could not be found')
        break

      case 'E_INVALID_CALCULATION_TYPE':
        throw new BadQueryError(`Unrecognized type: "${this.route.dto.type}"`)
        break

      default: throw error
    }
  }
}

module.exports = AppendCalculationEndpoint
```

The `append calculation` endpoint is here defined.

- We start by showing you how to access data in the request through the `dto` *(Data Transfer Object)* located on the route.
- Next we locate the `calculator` service.
- Followed by appending a calculation to the stored calculated sum.
- And finally we populate the `view model` with the result of the calculation.

Apart from the `dispatch` method, this time, we also define an `onError` method. This is the method that will be called if an error is thrown in the `dispatch` method. The first parameter to the `onError` method is the error that was thrown in the `dispatch` method.

#### `src/calculator/config.js`

```js
module.exports =
{
  locator:
  {
    'calculator' : __dirname
  }
}
```

In the `calculator config` we define where a path to a module is located, and where the locator can find a "composit" to locate the service through.

#### `src/calculator/index.js`

```js
const
CalculationCouldNotBeFoundError = require('./error/calculation-could-not-be-found'),
InvalidCalculationTypeError     = require('./error/invalid-calculation-type')

class Calculator
{
  constructor(console)
  {
    this.calculations = []
  }

  createCalculation()
  {
    return this.calculations.push(0)
  }

  appendToCalculation(id, type, value)
  {
    if(id < 0
    || id >= this.calculations.length)
    {
      throw new CalculationCouldNotBeFoundError(`Id out of range: "${id}/${this.calculations.length}"`)
    }

    switch(type)
    {
      case 'addition':
        return this.calculations[id] += value

      case 'subtraction':
        return this.calculations[id] -= value

      default:
        throw new InvalidCalculationTypeError(`Unrecognized type used for calculation: "${type}"`)
    }
  }
}

module.exports = Calculator
```

The calculator service is here defined. Good practice dictate that we should define isolated errors for everything that can go wrong. On top of the service we require these errors to have access to the type and to be able to trow when needed.

It's a simple service, I let the code speak for it-self what it does...

#### `src/calculator/locator.js`

```js
const Calculator = require('.')

class CalculatorLocator
{
  locate()
  {
    return new Calculator
  }
}

module.exports = CalculatorLocator
```

The locator is responsible for dependency injection related to the service it creates.

#### `src/calculator/error/calculation-could-not-be-found.js`

```js
class CalculationCouldNotBeFoundError extends Error
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_CALCULATION_COULD_NOT_BE_FOUND'
  }
}

module.exports = CalculationCouldNotBeFoundError
```

A specific error with a specific error code; specifying what specific type of error is thrown.

#### `src/calculator/error/invalid-calculation-type.js`

```js
class InvalidCalculationTypeError extends Error
{
  constructor(...args)
  {
    super(...args)
    this.code = 'E_INVALID_CALCULATION_TYPE'
  }
}

module.exports = InvalidCalculationTypeError
```

Another specific error...

## Test

#### `test/mocha.opts`

```
--require test/index
--full-trace
```

#### `test/index.js`

```js
const core = require('../src')
core.locate('path').main.dirname = __dirname + '/../src'
module.exports = core
```

#### `test/test.calculations.js`

```js
describe('Calculations', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext')

  let core

  before(() =>
  {
    core = require('.')
  })

  after(() =>
  {
    core.locate('http/server').close()
  })

  it('create calculation', async function()
  {
    const configuration = core.locate('configuration')
    const httpRequest   = core.locate('http/request')
    context(this, { title:'route', value:configuration.find('http.server.routes.create-calculation') })
    const response = await httpRequest.post('http://localhost:9001/calculations')
    expect(response.data.id).to.be.equal(0)
  })

  it('append calculation', async function()
  {
    const configuration = core.locate('configuration')
    const httpRequest   = core.locate('http/request')
    context(this, { title:'route', value:configuration.find('http.server.routes.append-calculation') })
    const data = { id:0, type:'addition', value:100 }
    const response = await httpRequest.put({ url:'http://localhost:9001/calculations/0', data })
    expect(response.data.result).to.be.equal(100)
  })
})
```
