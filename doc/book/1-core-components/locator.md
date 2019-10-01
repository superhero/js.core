# Locator

The `core/locator` component is a service locator. This component is central to the core framework. This component has deppandes from many different components in the core libarary, and is referenced in many different documentations of different core components.

The core component is tightly coupled with the locator, the core component is dependent on the locator. The core component has a load method that will eager load specified services from the components configurations.

---

## Example

I feel it is best suited to explain the locator component by explicitly explain the expected workflow. Below you find a defined file direcory, followed by code snippets of each file and explanations of each of these files and there purpose.

```
app
└── src
│   ├── foobar
│   │   ├── config.js
│   │   ├── index.js
│   │   └── locator.js
│   └── index.js
└── package.json
```

As we see in the file structure above, we have a simple `app` with a `src` folder that contains the source code. The `src` folder contains a components called `foobar`. In the root of the `foobar` components folder there is a config file that defines how the component integrates with the core context.

### app/src/foobar/config.js

```js
module.exports =
{
  core:
  {
    locator:
    {
      'foobar' : __dirname
    }
  }
}
```

Above is a defintion of a component configuration that defines the locatable service `foobar`. The service `foobar` is defined by the following simple class.

### app/src/foobar/index.js

```js
class Foobar
{
  constructor(console)
  {
    this.console = console
  }

  foo(bar)
  {
    this.console.log(bar)
  }
}

module.exports = Foobar
```

The code snippet above defines a class called `Foobar` with the defined dependency `console`. The `Foobar` class has a method called `foo` that accepts an argument called `bar`, that later is logged to the console when invoked.

As we can see above, the class it self is exported by the NodeJs framework. Note that we are not exporting an instance of the class. The instanciation and construction of the class will be done by the locator, as shown below.

### app/src/foobar/locator.js

```js
const
Foobar              = require('.'),
LocatorConstituent  = require('superhero/core/locator/constituent')

class FoobarLocator extends LocatorConstituent
{
  locate()
  {
    const
    console = this.locator.locate('core/console'),
    foobar  = new Foobar(console)

    return foobar
  }
}

module.exports = FoobarLocator
```

Above you see a locator constituent. The contract is that a `locate` method must be present in the class. The extention to `superhero/core/locator/constituent` provides access to the `core/locator` component through the variable `this.locator`.

In above example, the instance `foobar` is created and injected with its dependency, the `core/console` component, which is located through the locator.

When the locator is being eager loaded by the core context, the `locate` method above is called to locate the instance `foobar`, and can be accessed through the locator, in the same way as we above locate the `core/console` component, or located through the core context, as shown below.

### app/src/index.js

```js
const
CoreFactory = require('superhero/core/factory'),
coreFactory = new CoreFactory,
core        = coreFactory.create()

core.add('foobar')
core.load()
core.locate('foobar').foo('Hello World')
```

Above code is the main script of this example. This is where the core context is created, defined and loaded.

First we create the core instance, followed by adding the component `foobar` to the core context, followed by loading the core context - which triggers the eager loading process, where the above defined locator constituent is used to create the instance.

In the end, the `foobar` component is located and used by passing the the string `Hello World` to the method `foo`, resulting in a log message in the console.

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
    "superhero": "*"
  }
}
```

Above is a simple example of the `package.json` file used in this example application.

---

## Dynamic configuration specification

To ease work with the locator, in the configuration it is possible to make dynamic references. The example below shows a directory with many different services.

```
app
└── src
    └── domain
        ├── service
        │   ├── foo
        │   │   ├── index.js
        │   │   └── locator.js
        │   ├── bar
        │   │   ├── index.js
        │   │   └── locator.js
        │   ├── baz
        │   │   ├── index.js
        │   │   └── locator.js
        │   └── qux
        │       ├── index.js
        │       └── locator.js
        └── config.js
```

To include all these services, the configuration in the domain is expected to look something like the example below shows.

```js
module.exports =
{
  core:
  {
    locator:
    {
      'service/foo' : __dirname + '/service/foo',
      'service/bar' : __dirname + '/service/bar',
      'service/baz' : __dirname + '/service/baz',
      'service/qux' : __dirname + '/service/qux'
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
    locator:
    {
      'service/*' : __dirname + '/service/*'
    }
  }
}
```

---

## Good practice

It is recommended, and by this documentation considered good practice, that you never create a service that is dependent on the `core/locator` component. The locator pattern should be considered as a framework layer, a layer that you should not be integreated with the projects business logic.

Service locators consists of a larger scope of defined services. If you describe a dependency in your implementations to this larger scope, you are not explicit in your decleration, which is a bad code standard.

This concept is appearent when you work with unit testing. If the unit is dependent on a greater scope that needs to be loaded before you can test the unit, you have defined a much larger test then necessery for the unit.

This concept is also appearent when others read your code, or integrates with it. It is much easier to undersand what an implementation does when an explicit dependency injection is honered.

If we relate to the service locator as a container of the global scope, then creating a dependency to the locator, is the same as creating a dependency to the global scope. It is concidered good practice to isolate your implementations to the local scope the unit operates in to deflect unexpected side effects.
