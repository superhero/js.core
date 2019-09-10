# Bootstrap

The bootstrap component is meant to define a post core load, and pre application execution, process.

The bootstrap component is important that you run, as there are framework specific logic that depends on that the process has finished.

---

The process is a simple concept. In the configuration file of any component that you added and loaded to the core, you can specify a configuration that specifies what operation should run on bootstrap.

```js
{
  core:
  {
    bootstrap:
    {
      'unique-key' : 'foo/bar'
    },
    locator:
    {
      'foo/bar' : '/absolute/path/to/service'
    }
  }
}
```

The example above is a snippet that describes how you can hook into the process by specifying a bootstrap service. The bootstrap process will use the `core/locator` component to locate the bootstrap service. Therefor you must first specify the directory path to the service for the locator as described in the chapter that documents the `core/locator` component.

As the example above shows, you must specify a key for the bootstrap operation, a unique name that identifies the operation. In this way, by design, you are able to replace or deactivate the bootstrap operation. You can deactivate the operation by replacing the value with a false boolean value.

---

## The bootstrap contract

The bootstrap service must honor the bootstrap contract, which simply dictates that a bootstrap method is present in the interface of the service. No arguments are passed to the method. The method can be asynchronous. Example of a bootstrap service follows below.

```js
class Foobar
{
  bootstrap()
  {
    console.log('Hello world')
  }
}
```

In the example above, the bootstrap method is not prefixed with the `async` keyword. The bootstrap manager will however `await` the result of every bootstrap operation. That means that the bootstrap process is a serial asynchronous process, composed of several bootstrap operations that are loaded in a hierarchical order. The hierarchical order is defined by the order which the components are added to the core component.
