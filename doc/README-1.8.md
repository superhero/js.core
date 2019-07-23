# Core

Licence: [MIT](https://opensource.org/licenses/MIT)

---

- A core framework I use when developing in [nodejs](https://nodejs.org/en/docs/).
- I built the framework to help me build applications after a reactive [domain driven design (DDD)](https://en.wikipedia.org/wiki/Domain-driven_design) approch.
- The framework is designed to have little to no production dependencies.
- The framework offers solutions for different topics, not necessarily an http server.
- The vision of the framework is to offer a code structure to the developer that will help segregate responsibilities in projects through a [SOLID](https://en.wikipedia.org/wiki/SOLID) [OOP](https://en.wikipedia.org/wiki/Object-oriented_programming) approach.

## Addons

Consider extending the framework with one or multiple plugins where the extra functionality is required:  
*Please note; you should use matching versions for core and the plugins by major and future releases*

- [core-handlebars](http://github.com/superhero/js.core.handlebars)
- [core-resource](http://github.com/superhero/js.core.resource)
- [core-websocket](http://github.com/superhero/js.core.websocket)

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
│   │   ├── middleware
│   │   │   └── authentication.js
│   │   └── config.js
│   ├── calculator
│   │   ├── error
│   │   |   ├── calculation-could-not-be-found.js
│   │   |   └── invalid-calculation-type.js
│   │   ├── calculation.js
│   │   ├── config.js
│   │   ├── index.js
│   │   └── locator.js
│   ├── logger
│   │   ├── config.js
│   │   ├── index.js
│   │   └── locator.js
│   └── index.js
├── test
│   ├── init.js
│   ├── mocha.opts
│   ├── test.calculations.js
│   └── test.logger.js
├── .gitignore
├── package.json
└── README.md
```

The file structure is here divided to only 3 modules

- One called `api` *- that's responsible for the endpoints.*
- A second one called `calculator` *- that is responsible for domain logic.*
- The third one called `logger` *- an infrastructure layer that will log events to the console.*

#### `.gitignore`

```
docs/generated
npm-debug.log
node_modules
package-lock.json
.nyc_output
```

Set up a `.gitignore` file to ignore some auto-generated files to keep a clean repository.

#### `package.json`

```js
{
  "name": "Super Duper App",
  "version": "0.0.1",
  "description": "An example application of the superhero/core framework",
  "repository": "https://github.com/...",
  "license": "MIT",
  "main": "src/index.js",
  "author": {
    "name": "Padawan",
    "email": "padawan@example.com"
  },
  "scripts": {
    "docs-coverage": "nyc mocha './test/test.*.js' --opts ./test/mocha.opts && nyc report --reporter=html --report-dir=./docs/generated/coverage",
    "docs-tests": "mocha './test/test.*.js' --opts ./test/mocha.opts --reporter mochawesome --reporter-options reportDir=docs/generated/test,reportFilename=index,showHooks=always",
    "test": "nyc mocha './test/test.*.js' --opts ./test/mocha.opts",
    "start": "node ./src/index.js"
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

Our [`package.json`](https://docs.npmjs.com/files/package.json) file will dictate what dependencies we use. This example application will go through test cases, why we have a few `devDependencies` defined.

#### `index.js`

```js
const
CoreFactory = require('@superhero/core/factory'),
coreFactory = new CoreFactory,
core        = coreFactory.create()

core.add('api')
core.add('calculator')
core.add('logger')
core.add('http/server')

core.load()

core.locate('bootstrap').bootstrap().then(() =>
core.locate('http/server').listen(process.env.HTTP_PORT))
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

### Api

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
          url     : '/calculations',
          method  : 'post',
          endpoint: 'api/endpoint/create-calculation',
          view    : 'http/server/view/json'
        },
        'authentication':
        {
          middleware :
          [
            'api/middleware/authentication'
          ]
        },
        'append-calculation':
        {
          url     : '/calculations/.+',
          method  : 'put',
          endpoint: 'api/endpoint/append-calculation',
          view    : 'http/server/view/json',
          dto     :
          {
            'id'    : { 'url'   : 2 },
            'type'  : { 'body'  : 'type' },
            'value' : { 'body'  : 'value' }
          }
        }
      }
    }
  },
  authentication:
  {
    apikey : 'ABC123456789'
  }
}
```

I have here chosen to set up a folder structure with one module called `api`. This module will contain all the endpoints. As such, the config file of this module will specify the router setting for these endpoints.

I set up two explicit routes: `create-calculation` and `append-calculation`, and one middleware route: `authentication`.

- The **action** attribute declares on what **url pathname** the route will be valid for.
- The **method** attribute declares on what **url method** the route will be valid for

The middleware route does not have an action or method constraint specified, so it's considered valid, but it does not have an endpoint specified; declaring it not unterminated. When a route is valid, but unterminated, then it will be merged together with every other valid route specified until one that is terminated appears, eg: one that has declared an endpoint.

#### `src/api/endpoint/create-calculation.js`

```js
const Dispatcher = require('@superhero/core/http/server/dispatcher')

/**
 * @extends {@superhero/core/http/server/dispatcher}
 */
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
Dispatcher        = require('@superhero/core/http/server/dispatcher'),
PageNotFoundError = require('@superhero/core/http/server/dispatcher/error/page-not-found'),
BadRequestError   = require('@superhero/core/http/server/dispatcher/error/bad-request')

/**
 * @extends {@superhero/core/http/server/dispatcher}
 */
class AppendCalculationEndpoint extends Dispatcher
{
  dispatch()
  {
    const
    calculator  = this.locator.locate('calculator'),
    composer    = this.locator.locate('composer'),
    calculation = composer.compose('calculation', this.route.dto),
    result      = calculator.appendToCalculation(calculation)

    this.view.body.result = result
  }

  onError(error)
  {
    switch(error)
    {
      case 'E_CALCULATION_COULD_NOT_BE_FOUND':
        throw new PageNotFoundError('Calculation could not be found')

      case 'E_INVALID_CALCULATION_TYPE':
        throw new BadRequestError(`Unrecognized type: "${this.route.dto.type}"`)

      case 'E_COMPOSER_INVALID_ATTRIBUTE':
        throw new BadRequestError(error.message)

      default:
        throw error
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

#### `src/api/middleware/authentication.js`

```js
const
Dispatcher    = require('@superhero/core/http/server/dispatcher'),
Unauthorized  = require('@superhero/core/http/server/dispatcher/error/unauthorized')

/**
 * @extends {@superhero/core/http/server/dispatcher}
 */
class AuthenticationMiddleware extends Dispatcher
{
  async dispatch(next)
  {
    const
    configuration = this.locator.locate('configuration'),
    apikey        = this.request.headers['api-key']

    if(apikey === configuration.find('authentication.apikey'))
    {
      await next()
    }
    else
    {
      throw new Unauthorized('You are not authorized to access the requested resource')
    }
  }
}

module.exports = AuthenticationMiddleware
```

This middleware is used for authentication. It's a simple implementation, one should look at using a more robust solution, involving an ACL, when creating a solution for production environment. This example serves a purpose to show a good use-case for when to apply a middleware, not how best practice regarding authentication is defined.

**OBS!** The post handling (after the `next` callback has been called) will be handled in reversed order.

```
    Middleware
      ↓    ↑
    Middleware
      ↓    ↑
     Endpoint
```

### Calculator

#### `src/calculator/calculation.js`

```js
/**
 * @typedef {Object} CalculatorCalculationDto
 * @property {number} id
 * @property {string} type
 * @property {number} value
 */
const dto =
{
  'id':
  {
    'type'    : 'integer',
    'unsigned': true
  },
  'type':
  {
    'type': 'string',
    'enum':
    [
      'addition',
      'subtraction'
    ]
  },
  'value':
  {
    'type': 'decimal'
  }
}

module.exports = dto
```

Defining a JSON schema for a dto; calculation. It's a good praxis to also define the type in "jsdoc", as seen above.

A table over validation and filtration rules follows...

|             | boolean   | decimal   | integer   | json      | schema    | string    | timestamp |
|-------------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|
| default     | *         | *         | *         | *         | *         | *         | *         |
| collection  | boolean   | boolean   | boolean   | boolean   | boolean   | boolean   | boolean   |
| optional    | boolean   | boolean   | boolean   | boolean   | boolean   | boolean   | boolean   |
| nullable    | boolean   | boolean   | boolean   | boolean   | boolean   | boolean   | boolean   |
| unsigned    | -         | boolean   | boolean   | -         | -         | -         | -         |
| min         | -         | number    | number    | -         | -         | number    | timestamp |
| max         | -         | number    | number    | -         | -         | number    | timestamp |
| gt          | -         | number    | number    | -         | -         | number    | timestamp |
| lt          | -         | number    | number    | -         | -         | number    | timestamp |
| enum        | array     | array     | array     | -         | -         | array     | array     |
| uppercase   | -         | -         | -         | -         | -         | boolean   | -         |
| lowercase   | -         | -         | -         | -         | -         | boolean   | -         |
| not-empty   | -         | -         | -         | -         | -         | boolean   | -         |
| stringified | -         | -         | -         | boolean   | -         | -         | -         |
| indentation | -         | -         | -         | number    | -         | -         | -         |
| schema      | -         | -         | -         | -         | string    | -         | -         |

#### `src/calculator/config.js`

```js
module.exports =
{
  composer:
  {
    schema:
    {
      'calculation' : __dirname + '/calculation'
    }
  },
  locator:
  {
    'calculator' : __dirname
  }
}
```

In the `calculator config` we define where a path to a module is located, and where the locator can find a constituent locator to locate the service through.

#### `src/calculator/index.js`

```js
const
CalculationCouldNotBeFoundError = require('./error/calculation-could-not-be-found'),
InvalidCalculationTypeError     = require('./error/invalid-calculation-type')

/**
 * Calculator service, manages calculations
 */
class Calculator
{
  /**
   * @param {@superhero/eventbus} eventbus
   */
  constructor(eventbus)
  {
    this.eventbus     = eventbus
    this.calculations = []
  }

  /**
   * @returns {number} the id of the created calculation
   */
  createCalculation()
  {
    const id = this.calculations.push(0)
    this.eventbus.emit('calculator.calculation-created', { id })
    return id
  }

  /**
   * @throws {E_CALCULATION_COULD_NOT_BE_FOUND}
   * @throws {E_INVALID_CALCULATION_TYPE}
   *
   * @param {CalculatorCalculation} dto
   *
   * @returns {number} the result of the calculation
   */
  appendToCalculation({ id, type, value })
  {
    if(id < 1
    || id > this.calculations.length)
    {
      throw new CalculationCouldNotBeFoundError(`Id out of range: "${id}/${this.calculations.length}"`)
    }

    switch(type)
    {
      case 'addition':
      {
        const result = this.calculations[id - 1] += value
        this.eventbus.emit('calculator.calculation-appended', { id, type, result })
        return result  
      }
      case 'subtraction':
      {
        const result = this.calculations[id - 1] -= value
        this.eventbus.emit('calculator.calculation-appended', { id, type, result })
        return result  
      }
      default:
      {
        throw new InvalidCalculationTypeError(`Unrecognized type used for calculation: "${type}"`)
      }
    }
  }
}

module.exports = Calculator
```

The calculator service is here defined. Good practice dictate that we should define isolated errors for everything that can go wrong. On top of the service we require these errors to have access to the type and to be able to trow when needed.

It's a simple service that creates a calculation and allows to append an additional calculation to an already created calculation.

#### `src/calculator/locator.js`

```js
const
Calculator          = require('.'),
LocatorConstituent  = require('@superhero/core/locator/constituent')

/**
 * @extends {@superhero/core/locator/constituent}
 */
class CalculatorLocator extends LocatorConstituent
{
  /**
   * @returns {Calculator}
   */
  locate()
  {
    const eventbus = this.locator.locate('eventbus')
    return new Calculator(eventbus)
  }
}

module.exports = CalculatorLocator
```

The locator is responsible for dependency injection related to the service it creates.

#### `src/calculator/error/calculation-could-not-be-found.js`

```js
/**
 * @extends {Error}
 */
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
/**
 * @extends {Error}
 */
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

### Logger

#### `src/logger/config.js`

```js
module.exports =
{
  eventbus:
  {
    observers:
    {
      'calculator.calculation-created'  : [ 'logger' ],
      'calculator.calculation-appended' : [ 'logger' ]
    }
  },
  locator:
  {
    'logger' : __dirname
  }
}
```

Attaching a logger observer to specific events. Notice that the `locator` describes where the service can be located from, then used in the `eventbus.observers` context.

#### `src/logger/index.js`

```js
/**
 * @implements {@superhero/eventbus/observer}
 */
class Logger
{
  constructor(eventbus)
  {
    this.eventbus = eventbus
  }

  observe(event)
  {
    this.eventbus.emit('logger.logged-event', event)
  }
}

module.exports = Logger
```

The logger observer simply implements an interface to be recognized as an observer by the `eventbus`.

After we have logged the event to the console, we emit an event broadcasting that we have done so. By doing so, we can hook up to this event in the future if we like. For instance, when you like to create a test for the method, we can listen to this event.

#### `src/logger/locator.js`

```js
const
Logger              = require('.'),
LocatorConstituent  = require('@superhero/core/locator/constituent')

/**
 * @extends {@superhero/core/locator/constituent}
 */
class LoggerLocator extends LocatorConstituent
{
  /**
   * @returns {Logger}
   */
  locate()
  {
    const eventbus = this.locator.locate('eventbus')
    return new Logger(eventbus)
  }
}

module.exports = LoggerLocator
```

The logger locator creates the logger for the `service locator`.

### Test

#### `test/mocha.opts`

```
--require test/init.js
--ui bdd
--full-trace
--timeout 5000
```

There will probably be a lot of [settings you need to set for mocha](https://mochajs.org/api/mocha), sooner or later; just as well that we make it a praxis to define the options outside your `package.json` file.

#### `test/init.js`

```js
require.main.filename = __dirname + '/../src/index.js'
require.main.dirname  = __dirname + '/../src'
```

The init script must set some variables for the core to function as expected in testing.

The port is by design set through the environment variable `HTTP_PORT`. While testing we can set the variable to what ever we like, and what ever is suitable for the local machine we are on.

#### `test/test.calculations.js`

```js
describe('Calculations', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext')

  let core

  before((done) =>
  {
    const
    CoreFactory = require('@superhero/core/factory'),
    coreFactory = new CoreFactory

    core = coreFactory.create()

    core.add('api')
    core.add('calculator')
    core.add('logger')
    core.add('http/server')

    core.load()

    core.locate('bootstrap').bootstrap().then(() =>
    {
      core.locate('http/server').listen(9001)
      core.locate('http/server').onListening(done)
    })
  })

  after(() =>
  {
    core.locate('http/server').close()
  })

  it('A client can create a calculation', async function()
  {
    const configuration = core.locate('configuration')
    const httpRequest = core.locate('http/request')
    context(this, { title:'route', value:configuration.find('http.server.routes.create-calculation') })
    const response = await httpRequest.post('http://localhost:9001/calculations')
    expect(response.data.id).to.be.equal(1)
  })

  it('A client can append a calculation to the result of a former calculation if authentication Api-Key', async function()
  {
    const configuration = core.locate('configuration')
    const httpRequest = core.locate('http/request')
    context(this, { title:'route', value:configuration.find('http.server.routes.append-calculation') })
    const url = 'http://localhost:9001/calculations/1'
    const data = { id:1, type:'addition', value:100 }
    const response_unauthorized = await httpRequest.put({ url, data })
    expect(response_unauthorized.status).to.be.equal(401)
    const headers = { 'api-key':'ABC123456789' }
    const response_authorized = await httpRequest.put({ headers, url, data })
    expect(response_authorized.data.result).to.be.equal(data.value)
  })
})
```

#### `test/test.logger.js`

```js
describe('Logger', () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext')

  let core

  before((done) =>
  {
    const
    CoreFactory = require('@superhero/core/factory'),
    coreFactory = new CoreFactory

    core = coreFactory.create()

    core.add('api')
    core.add('calculator')
    core.add('logger')
    core.add('http/server')

    core.load()

    core.locate('bootstrap').bootstrap().then(done)
  })

  it('Events are logged to the console', function(done)
  {
    const configuration = core.locate('configuration')
    const eventbus      = core.locate('eventbus')
    context(this, { title:'observers', value:configuration.find('http.eventbus.observers') })
    eventbus.once('logger.logged-event', () => done())
    eventbus.emit('calculator.calculation-created', 'test')
  })
})
```

Finally I have designed a few simple tests that proves the pattern, and gives insight to the expected interface. Here I suggest using a [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) approach.

### Npm scripts

#### To run the application:

```
npm install --production
npm start
```

#### To test the application:

```
npm install
npm test
```

#### For an auto-generated coverage report in html:

```
npm run docs-coverage
```

#### For an auto-generated test report in html:

```
npm run docs-tests
```
