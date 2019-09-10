# Core

The framework has a core component. The core component is a contextual scope that contains "instances", or "services", that are isolated to the scope.

To instanciate a core component you should use the factory, as described bellow.

```js
const
CoreFactory = require('superhero/core/factory'),
coreFactory = new CoreFactory,
core        = coreFactory.create()
```

The factory will add all of the core components that can be found in the source code; under the directory "core". Each component offers different functionality and is documented. See specific chapters if you like to learn more about what solutions are offered.

---

## Local component

Additionaly to the default core components described above, does that are added by default, you are expected to add your own components. The components you add can be domain specific, or extension libraries that your domain is dependent on.

```js
core.add('foobar')
```

Above is a simple example of how to add a component called `foobar`. This will tell the core instance that there is a component called `foobar` in the root of the project. The root is determined by where the main `index.js` file is located. The name `foobar` is actually a relative path that is used as a unique identifier for the component. If you where to add a component that is located in a subfolder, you could instead specify that path. The following example will add a component that is located in the path relative to the main script at `foobar/baz/qux`.

```js
core.add('foobar/baz/qux')
```

---

## External component

You can also add external components in the same way. The core component will first try to load the local reference, but if the local reference fails, then the core will attempt to load the component as an external resource. Loading an "handlebars" component could look something like the following example.

```js
core.add('@superhero/core.handlebars')
```

The prefixed at-symbol; `@` is part of the npm syntax, it is necessery in this example only becouse the module is published under the `superhero` username. If the module you like to use does not have this prefix, then the core will still load the component. The componet in the example is published at npm, and must first be added to your `package.json` file to be refferencable as the example shows.

```json
{
  "dependencies":
  {
    "@superhero/core.handlebars" : "*"
  }
}
```

---

## Add a component by absolute path

It is also possible to add a component by name while specifying an abolute path.

```js
core.add('foobar', __dirname + '/../foobar')
```

The above example will load a component that is sibling to the main path, given that the code example is executed in the main script. It is a useful behaviour, for example if you have a seperate test directory that is a sibling directory to where your source code is located, and you need to use different configurations for testing then in production.

---

## Replace default behaviour

By default, the core factory adds different modules. One of which is the `core/console` component. The `core/console` component is used when writing to the console. Perhaps you do not like the behaviour of the component, and like to replace the component with a different implementation. You can then simply write your own implementation in the same relevant directory structure as the name of the component. In this case in the directory: `core/console`. Or simply specify the name with the absolute path:

```js
core.add('core/console', 'some-directory-path/console')
```

It is recomended that your follow the interface of the default servivce that you replace, but it is not a requirement. If the behaviour is used by the core however, and not implemented in the replacement component, then errors are expected to be thrown.

---

## Remove a component

It is also possible to remove an already added components by the `remove` method.

```js
core.remove('http/server')
```

By default, all core components are added to the context, if you like to optimize what components your application is dependent on, then you need to remove them manually, as the example above shows.

It is only possible to remove an added component before the load process has been triggered.

---

## What is a component

All components are not valid. A valid component is required to have a configuration file in the directory root of the component. This configuration file `config.js` is important as it defines how the component pluggs into the functionality of the framework. How to plugg into specific parts of the framework should be understood by reading the specific documentations of the specific component you like to plugg into.

An example of a configuration file follows below.

```js
{
  core:
  {
    locator:
    {
      'foobar' : '/path/to/locatable/resource'
    }
  }
}
```

Above configuration must be exported through the normal `module.exports` in the file `config.js` located in the root of the component.

----

## Loading the core context

Once you have added the components that you like to use for your application, you must load the context. Loading the context is done as the example below shows.

```js
core.load()
```

When loading, the core will validate the components added, and merge there configuration files together as one. This means that you can write over configurations set by one component in another. This behaviour can have unexpected consequenzes if you are not careful. The possibility to change configurations that is already defined is allowed by design. The purpose of being able to write over configured variables is for example important when you use the same code base in different contexts - if you are testing, or using a development environment, you will probably not connect to the same infrastructure that is used by your application in production.

Next, the `load` operation will also eager-load all services defined in the merged configuration file into the service locator, described closer in documentation about the component `core/locator`. The locator component, though it is a simple concept, it is central to the framework and deserves some extra attention.

---

## Bootstrapping

The bootstrap component `core/bootstrap` is mentioned here as it more or less is always required to bootstrap the application before you start your application specific logic.

```js
core.locate('core/bootstrap').bootstrap().then(() =>
{
  // ... application logic goes here
})
```

You can read more about the bootstrap process, what it does and how you can integrate with the process, under the chapter that documents the component.
