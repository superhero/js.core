# Schema

This component uses a composer to filter and validate a data structure in accordence to a defiend schema.

---

## Availible validators and filters

In below table you can see which type of validators and filters that are availible to each schema type that is titled in the column.

|                      | csv       | boolean   | decimal   | email   | integer   | json      | schema    | string    | timestamp |
|----------------------|-----------|-----------|-----------|---------|-----------|-----------|-----------|-----------|-----------|
| default              | ✔         | ✔         | ✔         | ✔       | ✔         | ✔         | ✔         | ✔         | ✔         |
| collection           | boolean   | boolean   | boolean   | boolean | boolean   | boolean   | boolean   | boolean   | boolean   |
| collection-size-min  | number    | number    | number    | number  | number    | number    | number    | number    | number    |
| collection-size-max  | number    | number    | number    | number  | number    | number    | number    | number    | number    |
| optional             | boolean   | boolean   | boolean   | boolean | boolean   | boolean   | boolean   | boolean   | boolean   |
| nullable             | boolean   | boolean   | boolean   | boolean | boolean   | boolean   | boolean   | boolean   | boolean   |
| unsigned             | ✗         | ✗         | boolean   | boolean | boolean   | ✗         | ✗         | ✗         | ✗         |
| min                  | number    | ✗         | number    | ✗       | number    | ✗         | ✗         | number    | timestamp |
| max                  | number    | ✗         | number    | ✗       | number    | ✗         | ✗         | number    | timestamp |
| gt                   | number    | ✗         | number    | ✗       | number    | ✗         | ✗         | number    | timestamp |
| lt                   | number    | ✗         | number    | ✗       | number    | ✗         | ✗         | number    | timestamp |
| length               | ✗         | ✗         | ✗         | ✗       | ✗         | ✗         | ✗         | number    | ✗         |
| enum                 | array     | array     | array     | ✗       | array     | ✗         | ✗         | array     | array     |
| uppercase            | boolean   | ✗         | ✗         | boolean | ✗         | ✗         | ✗         | boolean   | ✗         |
| lowercase            | boolean   | ✗         | ✗         | boolean | ✗         | ✗         | ✗         | boolean   | ✗         |
| not-empty            | boolean   | ✗         | ✗         | boolean | ✗         | ✗         | ✗         | boolean   | ✗         |
| decode               | ✗         | ✗         | ✗         | boolean | ✗         | ✗         | ✗         | boolean   | ✗         |
| stringified          | ✗         | ✗         | ✗         | ✗       | ✗         | boolean   | ✗         | ✗         | ✗         |
| indentation          | ✗         | ✗         | ✗         | ✗       | ✗         | number    | ✗         | ✗         | ✗         |
| schema               | ✗         | ✗         | ✗         | ✗       | ✗         | ✗         | string    | ✗         | ✗         |
| trait                | ✗         | ✗         | ✗         | ✗       | ✗         | ✗         | string    | ✗         | ✗         |
| date                 | ✗         | ✗         | ✗         | ✗       | ✗         | ✗         | ✗         | ✗         | boolean   |
| local                | ✗         | ✗         | ✗         | ✗       | ✗         | ✗         | ✗         | ✗         | boolean   |
| localDate            | ✗         | ✗         | ✗         | ✗       | ✗         | ✗         | ✗         | ✗         | boolean   |
| localTime            | ✗         | ✗         | ✗         | ✗       | ✗         | ✗         | ✗         | ✗         | boolean   |
| utc                  | ✗         | ✗         | ✗         | ✗       | ✗         | ✗         | ✗         | ✗         | boolean   |
| json                 | ✗         | ✗         | ✗         | ✗       | ✗         | ✗         | ✗         | ✗         | boolean   |

---

## Example application

This example will show a simple application with an expected flow that uses schemas at route level, as well as in context-mapper, the infrastructural anti-corruption layer.

```
app
├── src
│   ├── api
│   │   ├── endpoint
│   │   │   └── fetch-person.js
│   │   └── config.js
│   ├── domain
│   │   ├── aggregate
│   │   │   └── person
│   │   │       ├── index.js
│   │   │       └── locator.js
│   │   ├── schema
│   │   │   ├── dto
│   │   │   │   └── query-person.js
│   │   │   └── entity
│   │   │       └── person.js
│   │   └── config.js
│   ├── infrastructure
│   │   ├── db
│   │   │   └── repository
│   │   │       ├── index.js
│   │   │       ├── locator.js
│   │   │       └── mapper.js
│   │   └── config.js
│   └── index.js
└── package.json
```

Above is an overview of a defined filestructure of an application that has only 1 endpoint, that is to fetch a person.

---

### Api

The api layer is where the interactable interface to the application is defined.

---

### app/src/api/endpoint/fetch-person.js

```js
const Dispatcher = require('superhero/core/http/server/dispatcher')

class EndpointPerson extends Dispatcher
{
  async dispatch()
  {
    const
    aggregate = this.locator.locate('aggregate/person'),
    person    = await person.fetch(this.route.dto)

    this.view.body = person
  }
}

module.exports = EndpointPerson
```

The endpoint above locates the aggregate for the person through wich a person is querried with the help of the dto, **D**ata **T**ransfer **O**bject, mapped by the route. The entity "person" is set to the view to be returned in the api call.

---

### app/src/api/config.js

```js
module.exports =
{
  core:
  {
    http:
    {
      routes:
      {
        'fetch-person':
        {
          url       : '/',
          method    : 'get',
          endpoint  : 'api/endpoint/fetch-person',
          view      : 'core/http/server/view/json',
          input     : 'dto/query-person',
          output    : 'entity/person'
        }
      }
    }
  }
}
```

In the configuration of the api layer, we define the route with the `input` and `output` schemas refferenced.

---

### Domain

The domain layer is where logic related to the context of the application is located.

---

### app/src/domain/aggregate/person/index.js

```js
class AggregatePerson
{
  constructor(repository)
  {
    this.repository = repository
  }

  fetch(dto)
  {
    return this.repository.fetchPerson(dto)
  }
}

module.exports = AggregatePerson
```

An aggregate is defined in the domain layer that is dependent on a repository that can fetch a person. In DDD, **D**omain **D**riven **D**esign, this dependency is expected to be contract oriented.

---

### app/src/domain/aggregate/person/locator.js

```js
const
AggregatePerson     = require('.'),
LocatorConstituent  = require('superhero/core/locator/constituent')

class AggregatePersonLocator extends LocatorConstituent
{
  locate()
  {
    const
    repository = this.locator.locate('db/repository'),
    aggregate  = new AggregatePerson(repository)

    return aggregate
  }
}

module.exports = AggregatePersonLocator
```

In the locator constituent for the "person" aggregate, the db repository is located and injected into the aggregate on construction.

---

### Domain / Schema

In a sub layer to the domain we expect to find the schemas that defines the domains data structures.

The schema layer has different sub layers as well; `dto`, `entity` and `value-object` are some common layers used by the DDD community in this scope.

---

### app/src/domain/schema/dto/query-person.js

```js
module.exports =
{
  'id':
  {
    'type'      : 'integer',
    'unsigned'  : true
  }
}
```

Above is a simple dto schema that defines a query used to fetch a person. As the query only has an attribute named `id` defined, a person can only be fetched by `id` in this example.

---

### app/src/domain/schema/entity/person.js

```js
module.exports =
{
  'id':
  {
    'type'      : 'integer',
    'unsigned'  : true
  },
  'name':
  {
    'type'      : 'string',
    'not-empty' : true
  },
  'age':
  {
    'type'      : 'integer',
    'unsigned'  : true
  }
}
```

In the entity layer we find the schema for the person defined. The entity has 3 attributes declared; `id`, `name` and `age`. The schema defines validation and filtration rules that are related to the data structure.

---

### app/src/domain/config.js

```js
module.exports =
{
  core:
  {
    locator:
    {
      'aggregate/person'    : __dirname + '/aggregate/person'
    },
    schema:
    {
      composer:
      {
        'dto/query-person'  : __dirname + '/schema/dto/query-person',
        'entity/person'     : __dirname + '/schema/entity/person'
      }
    }
  }
}
```

In the configuration file of the domain layer references are decalared to the agregate and the the schemas as shown above.

---

### Infrastructure

The infrastructure layer is the layer that contains logic related to interaction with external services, such as the database.

---

### app/src/infrastructure/db/gateway/locator.js

```js
const
mysql               = require('mysql'),
Db                  = require('@superhero/db'),
AdapterFactory      = require('@superhero/db/adapter/mysql/factory'),
LocatorConstituent  = require('superhero/core/locator/constituent')

class DbGatewayLocator extends LocatorConstituent
{
  locate()
  {
    const
    configuration   = this.locator.locate('core/configuration'),
    adapterFactory  = new AdapterFactory(),
    options         = configuration.find('infrastructure/db/gateway'),
    filePath        = __dirname + '/../sql',
    fileSuffix      = '.sql',
    adapter         = adapterFactory.create(mysql, options),
    gateway         = new Db(adapter, filePath, fileSuffix),

    return gateway
  }
}

module.exports = DbGatewayLocator
```

In this example we use the external component `@superhero/db` that is published on npm as the gateway. See in-dept documentation at the public repository for more information.

---

### app/src/infrastructure/db/repository/index.js

```js
const
DbRepository        = require('.'),
LocatorConstituent  = require('superhero/core/locator/constituent')

class DbRepository
{
  constructor(gateway, mapper)
  {
    this.gateway  = gateway
    this.mapper   = mapper
  }

  async fetchPerson(dto)
  {
    const
    result  = await this.gateway.query('person/fetch', [dto.id]),
    person  = this.mapper.mapPerson(result)

    return person
  }
}

module.exports = DbRepository
```

As seen in the example above, we have a dependency to the db gateway and a mapper, the context-mapper. The mapper will take the result from the database and map the result to an understandable data structure in accordence to the schema defined in the domain.

---

### app/src/infrastructure/db/repository/locator.js

```js
const
DbRepository        = require('.'),
DbRepositoryMapper  = require('./mapper'),
LocatorConstituent  = require('superhero/core/locator/constituent')

class DbRepositoryLocator extends LocatorConstituent
{
  locate()
  {
    const
    gateway     = this.locator.locate('db/gateway'),
    composer    = this.locator.locate('core/schema/composer'),
    mapper      = new DbRepositoryMapper(composer),
    repository  = new DbRepository(gateway, mapper)

    return repository
  }
}

module.exports = DbRepositoryLocator
```

In the locator for the repository we construct the repository, but we also construct the mapper. The mapper is injected with the located component `core/schema/composer`.

---

### app/src/infrastructure/db/repository/mapper.js

```js
class DbRepositoryMapper
{
  constructor(composer)
  {
    this.composer = composer
  }

  mapPerson(result)
  {
    if(result.length < 1)
    {
      throw new Error('No results found')
    }

    if(result.length > 1)
    {
      throw new Error('Conflicting results found')
    }

    return this.composer.compose('entity/person', result[0])
  }
}

module.exports = DbRepositoryMapper
```

In the context-mapper we use the schema composer to validate and filter the result before we return the expected data structure. It is considered good practice to use a composition pattern for the mapper. In this example the mapper is very simple, the mapper only has one responsibility as it is, why I decided to not use a composition pattern in this example.

---

### app/src/infrastructure/db/config.js

```js
module.exports =
{
  core:
  {
    locator:
    {
      'db/gateway'    : __dirname + '/db/gateway',
      'db/repository' : __dirname + '/db/repository'
    }
  },
  infrastructure:
  {
    db:
    {
      gateway:
      {
        connections : 5,
        host        : '...',
        user        : '...',
        password    : '...',
      }
    }
  }
}
```

In the configuration file of the infrastructure we declare the refferences to the location of the services `db/gateway` and `db/repository`. We also define the configuration options to the gateway. The values for `host`, `user` and `password` as 3 dots is placeholders for the values needed in the connection at hand.

---

### app/src/index.js

```js
const
CoreFactory = require('superhero/core/factory'),
coreFactory = new CoreFactory,
core        = coreFactory.create()

core.add('api')
core.add('domain')
core.add('infrastructure')

core.load()

core.locate('core/bootstrap').bootstrap().then(() =>
core.locate('core/http/server').listen(80))
```

Finally we define the main script that adds and loads the `api`, `domain` and the `infrastructure` components. After bootstrap, the server is instructed to listen to port `80` for incoming api calls.

---

### app/src/package.json

```js
{
  "name": "App",
  "version": "0.0.1",
  "description": "An example app",
  "repository": "https://github.com/...",
  "license": "MIT",
  "main": "src/index.js",
  "dependencies": {
    "superhero": "*",
    "@superhero/db": "*",
    "mysql": "*"
  }
}
```

Below is a simple example of the `package.json` file used in this example application.

---

## Meta definition

It is possible to define a meta attribute to your schema, which in turn allows 2 different possible meta descriptions; `extends` and `immutable`.

---

### Extends

From above example, we defined a person in a schema. If we want to have an extended type of a person, a `superhero` which has all the attributes of a person and an additional attribute; `superpower`, then we can use the meta attribute to extend the person as the example below describes.

```js
module.exports =
{
  '@meta':
  {
    'extends' : 'entity/person'
  },
  'superpower':
  {
    'type'    : 'string',
    'enum'    : ['invisibility', 'precognition', 'indestructible']
  }
}
```

It is also possible to extend from multiple references by using an array of refferences in the `extends` attribute.

---

### Excludes

When using extensions, sometimes it is decireable to exclude some attributes of the extended schema. It is possible to exclude attributes from a schema by defining the `excludes` sub-attribute in the `@meta` root-attribute.

```js
module.exports =
{
  '@meta':
  {
    'extends'   : 'entity/person',
    'excludes'  : 'age'
  },
  'superpower':
  {
    'type'    : 'string',
    'enum'    : ['invisibility', 'precognition', 'indestructible']
  }
}
```

It is also possible to exclude multiple attributes by specifying an array in the `excludes` attribute.

---

### Immutable

By default, the schema will construct an immutable object, an object that can not be changed, a frozen object. If you like a composed structure to instead be mutable, then you must specify that in the meta attribute, as in the example below.

```js
module.exports =
{
  '@meta':
  {
    'immutable' : false
  },
  // ...
}
```

It is also possible to control the immutable output of the `compose` method on the schema composer object (`core/schema/composer`) by passing a third optional argument to the method, as the below example shows.

```js
const 
  immutable = this.composer.compose('schema-name', dto, true),
  mutable   = this.composer.compose('schema-name', dto, false)
```

---

## Dynamic configuration specification

To make it easier to load schemas, it is possible to use a dynamic reference in the configurations. The example below shows a directory with many different shemas.

```
app
└── src
    └── domain
        ├── schema
        │   ├── foo.js
        │   ├── bar.js
        │   ├── baz.js
        │   └── qux.js
        └── config.js
```

To include all these services, the configuration in the domain is expected to look something like the example below shows.

```js
module.exports =
{
  core:
  {
    schema:
    {
      composer:
      {
        'schema/foo' : __dirname + '/schema/foo',
        'schema/bar' : __dirname + '/schema/bar',
        'schema/baz' : __dirname + '/schema/baz',
        'schema/qux' : __dirname + '/schema/qux'
      }
    }
  }
}
```

By using an **asterix** `*` in the configuration defintion, to specify a dynamic reference, the same configuration could look like the following example shows.

```js
module.exports =
{
  core:
  {
    schema:
    {
      composer:
      {
        'schema/*' : __dirname + '/schema/*'
      }
    }
  }
}
```

Both examples above has the same effect.
