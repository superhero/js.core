# Configuration

The configuration component, in the context of the framework, is perhaps not to unexpectedly the configuration manager, the component that contains the defined configuration data.

When the core component loads all added components in your main script, the core merges all configuration files of all components together and stores them in this confifiguration component. Post loading, the configuration data is frozen, no further merge or alteration to the data can be made post the core load process.

It is possible to set a `branch` on construction; that will result in the attempt to load additional configuration files with the branch name suffix in the configuration file name.

```js
const
  CoreFactory = require('superhero/core/factory'),
  coreFactory = new CoreFactory,
  branch      = 'staging',
  core        = coreFactory.create(branch)
```

The example above will, in addition to loading the default configuration of the component, try to load the configuration file: `config-staging` in each configurable layer. The `config-staging` file is expected to complement, and/or write over settings required for the envirment the branch represents.

---

## The find query

The configuration component has a very simple interface, basicly only one method that is relevant; the `find` method. The find method purpose is to find a configuration variable in the tree of defined configurations given a query as argument.

In the examples below, it is assumed that the configurations that has been loaded has been loaded with a defined json that looks as the following example shows.

```js
{
  foo:
  {
    bar:
    {
      baz: 'qux'
    }
  }
}
```

If we like to find the leaf configuration variable `baz`, we can use the query `foo.bar.baz`.

```js
const
  configuration = core.locate('core/configuration'),
  bazConfig     = configuration.find('foo.bar.baz')
```

### Alternative find query

Alternatively, we could instead use a query that seperates the path by a forward slash `/`. For example, instead of using the query `foo.bar.baz`, we can use the query `foo/bar/baz`, and expect the same result; the variable `bazConfig` will in both cases be of the value `qux`.

---

## The fallback

The purpose of the find method is to offer a solution to the problem presented in javascript working with nested objects. If you try to access a reference that does not exist, then an error will be thrown, as the example below shows.

```js
const config = configuration.config.none.existing.path
```

Above example will throw: `Uncaught TypeError: Cannot read property 'existing' of undefined`, while the following example below will instead return an `undefined` value.

```js
const config = configuration.find('none.existing.path')
```

Both alternatives precented above is a valid approch. If you expect an error to be thrown when attempting to access a configuration path that does not exist, then you should not use the `find` method. The only difference between the 2 alternatives is the fallback to `undefined`.
