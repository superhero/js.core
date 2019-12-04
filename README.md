# Core

Licence: [MIT](https://opensource.org/licenses/MIT)

---

[![npm version](https://badge.fury.io/js/superhero.svg)](https://badge.fury.io/js/superhero)

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

`npm install superhero`

...or just set the dependency in your `package.json` file:

```json
{
  "dependencies":
  {
    "superhero": "*"
  }
}
```

## Standards

Recommended standards are published in this repository, stored in the [`doc/standard`](doc/standard) folder.

***OBS!*** These standards are still being developed, rapid evolution between version 1 and 2 is to be expected.

 - [Microservice (sop-ms)](doc/standard/sop-ms.md)
 - [Source code (sop-src)](doc/standard/sop-src.md)
 - [API (sop-api)](doc/standard/sop-api.md)
 - [Domain (sop-domain)](doc/standard/sop-domain.md)
 - [Infrastructure (sop-infrastructure)](doc/standard/sop-infrastructure.md)
 - [View (sop-view)](doc/standard/sop-view.md)
 - [Test (sop-test)](doc/standard/sop-test.md)
 - [Event (sop-event)](doc/standard/sop-event.md)

## Automatic code and documentation generation

The package comes with a **CLI** helper (**C**ommand **L**ine **I**nterface). You do not need to use this helper in order to use the framework, but if you do get used to the helper you should be able to speed up your productivity.

If you install the package globally, by running  the folowing command `npm install superhero -g`, then you can use a CLI helper, that can be accessed from the terminal by running the command `superhero`:

```
                                 __
     _______  ______  ___  _____/ /_  ___  _________
    / ___/ / / / __ \/ _ \/ ___/ __ \/ _ \/ ___/ __ \
   (__  ) /_/ / /_/ /  __/ /  / / / /  __/ /  / /_/ /
  /____/\__,_/ .___/\___/_/  /_/ /_/\___/_/   \____/
            /_/


1. Generate project
2. Generate API classes and corresponding tests from configuration
3. Generate API documentation
4. Generate Domain classes from configuration

Choose your destiny:
```

As you can see, there's a menu where you can select different aid for code and documentation generation.

### Problems installing globally?

This is a guide on how to install the package globally, if you have problems with permissions, eg: `npm WARN checkPermissions Missing write access to /usr/lib/node_modules`

#### Solution

Tested on a debian distribution. Run the following commands:

```
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
```

Open or create a `~/.profile` file and add this line:

```
export PATH=~/.npm-global/bin:$PATH
```

Update your system variables by running:

```
source ~/.profile
```

Then again, run `npm install superhero -g`

## Example application

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
│   │   ├── observer
│   │   │   ├── calculation-appended
│   │   │   │   └── log
│   │   │   │       ├── index.js
│   │   │   │       └── locator.js
│   │   │   └── calculation-created
│   │   │       └── log
│   │   │           ├── index.js
│   │   │           └── locator.js
│   │   └── config.js
│   ├── domain
│   │   ├── aggregate
│   │   │   └── calculator
│   │   │       ├── error
│   │   │       │   ├── calculation-could-not-be-found.js
│   │   │       │   └── invalid-calculation-type.js
│   │   │       ├── index.js
│   │   │       └── locator.js
│   │   ├── schema
│   │   │   └── entity
│   │   │       └── calculation.js
│   │   └── config.js
│   └── index.js
├── test
│   ├── integration
│   │   ├── test.calculations.js
│   │   └── test.logger.js
│   ├── init.js
│   └── mocha.opts
├── .gitignore
├── package.json
└── README.md
```

The file structure is here divided to 2 different modules

- `api` *- responsible for the endpoints and observers.*
- `domain` *- responsible for domain logic.*

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
  "description": "An example application of the superhero framework",
  "repository": "https://github.com/...",
  "license": "MIT",
  "main": "src/index.js",
  "author": {
    "name": "Padawan",
    "email": "padawan@example.com"
  },
  "scripts": {
    "docs-coverage": "nyc mocha './{,!(node_modules)/**}/test.*.js' --opts ./test/mocha.opts && nyc report --reporter=html --report-dir=./docs/generated/coverage",
    "docs-tests": "mocha './{,!(node_modules)/**}/test.*.js' --opts ./test/mocha.opts --reporter mochawesome --reporter-options reportDir=docs/generated/test,reportFilename=index,showHooks=always",
    "test": "nyc mocha './{,!(node_modules)/**}/test.*.js' --opts ./test/mocha.opts",
    "start": "node ./src/index.js"
  },
  "dependencies": {
    "superhero": "*"
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
CoreFactory = require('superhero/core/factory'),
coreFactory = new CoreFactory,
core        = coreFactory.create()

core.add('api')
core.add('domain')

core.load()

core.locate('core/bootstrap').bootstrap().then(() =>
core.locate('core/http/server').listen(process.env.HTTP_PORT))
```

We start of by creating a core factory that will create the core object, central to our application. The core is designed to keep track of a global state related to it's context. You can create multiple cores if necessary, but normally it makes sens to only use one. This example will only use one core.

The next step is to add services that we will use in relation to the core context. Here we add `api` and `domain` that exists in the file tree previously defined. You also notice that we add the service `core/http/server` that does not exist in the file tree we defined. The `core/http/server` service is located in the core, but may not always be necessary to load depending on the scope of your application, so you need to add the `core/http/server` service when you want to set up an http server.
The framework will add services depending on a hierarchy of paths, it's possible to write over the configuration done by one component in another. This feature allows the developer to extend, or build on to, components declared functionality.

- First it will try to load in relation to your `main script`
- next it attempts by dependency defined in your `package.json` file
- and finally it will attempt to load related to the core library of existing services.

*This hierarchy allows you, as a developer, to overwrite anything in the framework with custom logic.*

Next we load the core! This will eager load all the services previously added to the context.

By bootstrapping the core, we run a few scripts that needs to run for some modules to function properly. As a developer you can hook into this process in the modules you write.

And in the end, after we have added, loaded and bootstrapped the modules related to the context, we tell the server to listen to a specific port for network activity. In this case, the environment variable `HTTP_PORT``is expected to be set to an integer.

### Api

#### `src/api/config.js`

```js
/**
 * @namespace Api
 */
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
          'create-calculation':
          {
            url     : '/calculations',
            method  : 'post',
            endpoint: 'api/endpoint/create-calculation',
            view    : 'core/http/server/view/json',
            input   : false
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
            url     : '/calculations/:id',
            method  : 'put',
            endpoint: 'api/endpoint/append-calculation',
            view    : 'core/http/server/view/json',
            input   : 'entity/calculation'
          }
        }
      }
    },
    eventbus:
    {
      observers:
      {
        'calculation created'   : { 'api/observer/calculation-created/log'  : true },
        'calculation appended'  : { 'api/observer/calculation-appended/log' : true }
      }
    },
    locator:
    {
      'api/observer/calculation-created/log'  : __dirname + '/observer/calculation-created/log',
      'api/observer/calculation-appended/log' : __dirname + '/observer/calculation-appended/log'
    }
  }
}

```

I have here chosen to set up a folder structure with a module called `api`. This module will contain all the endpoints. As such, the config file of this module will specify the router setting for these endpoints.

I set up two explicit routes: `create-calculation` and `append-calculation`, and one middleware route: `authentication`.

- The **url** attribute declares what **url pathname** the route will be valid for.
- The **method** attribute declares what **method** the route will be valid for

The middleware route does not have an action or method constraint specified, so it's considered valid, but it does not have an endpoint specified; declaring it's unterminated. When a route is valid, but unterminated, then it will be merged together with every other valid route specified until one that is terminated appears, eg: one that has declared an endpoint.

The `api` in this example is also responsible for attaching event listeners to events, or "domain events". In this example, we attach a logger observer to specific events. Notice that the `locator` describes where the observers can be located, then used in the `core.eventbus.observers` config context.

#### `src/api/endpoint/create-calculation.js`

```js
const Dispatcher = require('superhero/core/http/server/dispatcher')

/**
 * @memberof Api
 * @extends {superhero/core/http/server/dispatcher}
 */
class CreateCalculationEndpoint extends Dispatcher
{
  dispatch()
  {
    const
    calculator    = this.locator.locate('domain/aggregate/calculator'),
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
Dispatcher      = require('superhero/core/http/server/dispatcher'),
NotFoundError   = require('superhero/core/http/server/dispatcher/error/not-found'),
BadRequestError = require('superhero/core/http/server/dispatcher/error/bad-request')


/**
 * @memberof Api
 * @extends {superhero/core/http/server/dispatcher}
 */
class AppendCalculationEndpoint extends Dispatcher
{
  dispatch()
  {
    const
    calculator  = this.locator.locate('domain/aggregate/calculator'),
    calculation = this.route.dto,
    result      = calculator.appendToCalculation(calculation)

    this.view.body.result = result
  }

  onError(error)
  {
    switch(error)
    {
      case 'E_CALCULATION_COULD_NOT_BE_FOUND':
        throw new NotFoundError('Calculation could not be found')

      case 'E_INVALID_CALCULATION_TYPE':
        throw new BadRequestError(`Unrecognized type: "${this.route.dto.type}"`)

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
Dispatcher    = require('superhero/core/http/server/dispatcher'),
Unauthorized  = require('superhero/core/http/server/dispatcher/error/unauthorized')

/**
 * @memberof Api
 * @extends {superhero/core/http/server/dispatcher}
 */
class AuthenticationMiddleware extends Dispatcher
{
  async dispatch(next)
  {
    const
    configuration = this.locator.locate('core/configuration'),
    apikey        = this.request.headers['api-key']

    if(apikey === 'ABC123456789')
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

### Api - Observer

#### `src/api/observer/calculation-appended/log/index.js`

```js
/**
 * @memberof Api
 * @implements {superhero/core/eventbus/observer}
 */
class ObserverCalculationAppendedLog
{
  constructor(console, eventbus)
  {
    this.console  = console
    this.eventbus = eventbus
  }

  observe(data)
  {
    this.console.log(data)
    this.eventbus.emit('logged calculation appended event', data)
  }
}

module.exports = ObserverCalculationAppendedLog
```

*See description below...*

#### `src/api/observer/calculation-appended/log/locator.js`

```js
const
ObserverCalculationAppendedLog  = require('.'),
LocatorConstituent              = require('superhero/core/locator/constituent')

/**
 * @memberof Api
 * @extends {superhero/core/locator/constituent}
 */
class ObserverCalculationAppendedLogLocator extends LocatorConstituent
{
  /**
   * @returns {ObserverCalculationAppendedLog}
   */
  locate()
  {
    const
    console  = this.locator.locate('core/console'),
    eventbus = this.locator.locate('core/eventbus')

    return new ObserverCalculationAppendedLog(console, eventbus)
  }
}

module.exports = ObserverCalculationAppendedLogLocator
```

*See description below...*

#### `src/api/observer/calculation-created/log/index.js`

```js
/**
 * @memberof Api
 * @implements {superhero/core/eventbus/observer}
 */
class ObserverCalculationCreatedLog
{
  constructor(console, eventbus)
  {
    this.console  = console
    this.eventbus = eventbus
  }

  observe(data)
  {
    this.console.log(data)
    this.eventbus.emit('logged calculation created event', data)
  }
}

module.exports = ObserverCalculationCreatedLog
```

*See description below...*

#### `src/api/observer/calculation-created/log/locator.js`

```js
const
ObserverCalculationCreatedLog = require('.'),
LocatorConstituent            = require('superhero/core/locator/constituent')

/**
 * @memberof Api
 * @extends {superhero/core/locator/constituent}
 */
class ObserverCalculationCreatedLogLocator extends LocatorConstituent
{
  /**
   * @returns {ObserverCalculationCreatedLog}
   */
  locate()
  {
    const
    console  = this.locator.locate('core/console'),
    eventbus = this.locator.locate('core/eventbus')

    return new ObserverCalculationCreatedLog(console, eventbus)
  }
}

module.exports = ObserverCalculationCreatedLogLocator
```

The logger observers simply implements an interface to be recognized as an observer by the `eventbus`.

After we have logged the event to the console, we emit an event to broadcast that we have logged to the console. When broadcasting an event, we can observe this event in the future, if we like. For instance, when you like to create a test for the method, we can listen to this event to ensure the process is being fulfilled.

### Domain

#### `src/domain/aggregate/calculator/index.js`

```js
const
CalculationCouldNotBeFoundError = require('./error/calculation-could-not-be-found'),
InvalidCalculationTypeError     = require('./error/invalid-calculation-type')

/**
 * Calculator service, manages calculations
 * @memberof Domain
 */
class AggregateCalculator
{
  /**
   * @param {superhero/core/eventbus} eventbus
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
    this.eventbus.emit('calculation created', { id })
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
      throw new CalculationCouldNotBeFoundError(`ID out of range: "${id}/${this.calculations.length}"`)
    }

    switch(type)
    {
      case 'addition':
      {
        const result = this.calculations[id - 1] += value
        this.eventbus.emit('calculation appended', { id, type, result })
        return result
      }
      case 'subtraction':
      {
        const result = this.calculations[id - 1] -= value
        this.eventbus.emit('calculation appended', { id, type, result })
        return result
      }
      default:
      {
        throw new InvalidCalculationTypeError(`Unrecognized type used for calculation: "${type}"`)
      }
    }
  }
}

module.exports = AggregateCalculator
```

The calculator aggregate is here defined. Good practice dictate that we should define isolated errors for everything that can go wrong. First we require and define these errors to have access to the type and to be able to trow them when needed.

It's a simple aggregate that creates a calculation and allows to append an additional calculation to an already created calculation.

#### `src/domain/aggregate/calculator/locator.js`

```js
const
Calculator          = require('.'),
LocatorConstituent  = require('superhero/core/locator/constituent')

/**
 * @memberof Domain
 * @extends {superhero/core/locator/constituent}
 */
class AggregateCalculatorLocator extends LocatorConstituent
{
  /**
   * @returns {AggregateCalculator}
   */
  locate()
  {
    const eventbus = this.locator.locate('core/eventbus')
    return new AggregateCalculator(eventbus)
  }
}

module.exports = AggregateCalculatorLocator
```

The locator is responsible for dependency injection related to the aggregates it factor.

#### `src/domain/aggregate/calculator/error/calculation-could-not-be-found.js`

```js
/**
 * @memberof Domain
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
 * @memberof Domain
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

#### `src/domain/schema/entity/calculation.js`

```js
/**
 * @memberof Domain
 * @typedef {Object} EntityCalculation
 * @property {number} id
 * @property {string} type
 * @property {number} value
 */
const entity =
{
  'id':
  {
    'type'    : 'schema',
    'schema'  : 'value-object/id',
    'trait'   : 'id'
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

module.exports = entity
```

#### `src/domain/schema/value-object/id.js`

```js
/**
 * @memberof Domain
 * @typedef {Object} ValueObjectId
 * @property {number} id
 */
const valueObject =
{
  'id':
  {
    'type'    : 'integer',
    'unsigned': true
  }
}

module.exports = valueObject
```

Defining a JSON schema for an entity; calculation. It's a good praxis to also define the type in "jsdoc", as seen above.

A table over validation and filtration rules follows...

|                      | csv       | boolean   | decimal   | integer   | json      | schema    | string    | timestamp |
|----------------------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|-----------|
| default              | ✔         | ✔         | ✔         | ✔         | ✔         | ✔         | ✔         | ✔         |
| collection           | boolean   | boolean   | boolean   | boolean   | boolean   | boolean   | boolean   | boolean   |
| collection-size-min  | number    | number    | number    | number    | number    | number    | number    | number    |
| collection-size-max  | number    | number    | number    | number    | number    | number    | number    | number    |
| optional             | boolean   | boolean   | boolean   | boolean   | boolean   | boolean   | boolean   | boolean   |
| nullable             | boolean   | boolean   | boolean   | boolean   | boolean   | boolean   | boolean   | boolean   |
| unsigned             | ✗         | ✗         | boolean   | boolean   | ✗         | ✗         | ✗         | ✗         |
| min                  | number    | ✗         | number    | number    | ✗         | ✗         | number    | timestamp |
| max                  | number    | ✗         | number    | number    | ✗         | ✗         | number    | timestamp |
| gt                   | number    | ✗         | number    | number    | ✗         | ✗         | number    | timestamp |
| lt                   | number    | ✗         | number    | number    | ✗         | ✗         | number    | timestamp |
| length               | ✗         | ✗         | ✗         | ✗         | ✗         | ✗         | number    | ✗         |
| enum                 | array     | array     | array     | array     | ✗         | ✗         | array     | array     |
| uppercase            | boolean   | ✗         | ✗         | ✗         | ✗         | ✗         | boolean   | ✗         |
| lowercase            | boolean   | ✗         | ✗         | ✗         | ✗         | ✗         | boolean   | ✗         |
| not-empty            | boolean   | ✗         | ✗         | ✗         | ✗         | ✗         | boolean   | ✗         |
| stringified          | ✗         | ✗         | ✗         | ✗         | boolean   | ✗         | ✗         | ✗         |
| indentation          | ✗         | ✗         | ✗         | ✗         | number    | ✗         | ✗         | ✗         |
| schema               | ✗         | ✗         | ✗         | ✗         | ✗         | string    | ✗         | ✗         |
| trait                | ✗         | ✗         | ✗         | ✗         | ✗         | string    | ✗         | ✗         |

#### `src/domain/config.js`

```js
/**
 * @namespace Domain
 */
module.exports =
{
  core:
  {
    schema:
    {
      composer:
      {
        'entity/calculation' : __dirname + '/schema/entity/calculation'
      }
    },
    locator:
    {
      'domain/aggregate/calculator' : __dirname + '/aggregate/calculator'
    }
  }
}
```

In the `domain` `config` we define where a path to a module is located, and where the `locator` can find a constituent `locator` to locate/find a service through.

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
    CoreFactory = require('superhero/core/factory'),
    coreFactory = new CoreFactory

    core = coreFactory.create()

    core.add('domain')
    core.add('api')

    core.load()

    core.locate('core/bootstrap').bootstrap().then(() =>
    {
      core.locate('core/http/server').listen(9001)
      core.locate('core/http/server').onListening(done)
    })
  })

  after(() =>
  {
    core.locate('core/http/server').close()
  })

  it('A client can create a calculation', async function()
  {
    const configuration = core.locate('core/configuration')
    const httpRequest = core.locate('core/http/request')
    context(this, { title:'route', value:configuration.find('core.http.server.routes.create-calculation') })
    const response = await httpRequest.post('http://localhost:9001/calculations')
    expect(response.data.id).to.be.equal(1)
  })

  it('A client can append a calculation to the result of a former calculation if authentication Api-Key', async function()
  {
    const configuration = core.locate('core/configuration')
    const httpRequest = core.locate('core/http/request')
    context(this, { title:'route', value:configuration.find('core.http.server.routes.append-calculation') })
    const url = 'http://localhost:9001/calculations/1'
    const data = { id:1, type:'addition', value:100 }
    const response_unauthorized = await httpRequest.put({ url, data })
    expect(response_unauthorized.status).to.be.equal(401)
    const headers = { 'Api-Key':'ABC123456789' }
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
    CoreFactory = require('superhero/core/factory'),
    coreFactory = new CoreFactory

    core = coreFactory.create()

    core.add('domain')
    core.add('api')

    core.load()

    core.locate('core/bootstrap').bootstrap().then(done)
  })

  it('the logger is logging', function(done)
  {
    const configuration = core.locate('core/configuration')
    const eventbus      = core.locate('core/eventbus')
    context(this, { title:'observers', value:configuration.find('core.http.eventbus.observers') })
    eventbus.once('logged calculation created event', () => done())
    eventbus.emit('calculation created', 'test')
  })
})
```

Finally I have designed a few simple tests that proves the pattern, and gives insight to the expected interface. Here I suggest using a [BDD](https://en.wikipedia.org/wiki/Behavior-driven_development) approach, though my examples are not aligned with the principles.

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
