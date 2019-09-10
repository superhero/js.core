# Path

The `core/path` component is an aggregated instance that exposes functionality in relation to a string representing path to a file or directory.

---

## The path to the main script

On construction of this instance, the path to the main script filename, and the directory name of that file, are stored and can be accessed through the component in the following way.

```js
const
path      = core.locate('core/path'),
filename  = path.main.filename,
dirname   = path.main.dirname
```

---

## Wrapper for NodeJs path module

The path module in nodejs has a few implementations that are wrapped in this implementation, listed below.

- `dirname`
- `normalize`
- `extension`
- `isAbsolute`

See nodejs documentation for each case for further information.

---

### `isResolvable`

The NodeJs framework has a method called `require.resolve` that will throw an error if the argument is unresolvable. The method `isResolvable` in this implementation has wrppaed that functionality and returns a boolean value in relation to if the filename path is resolvable or not.

```js
const
filename    = 'path/to/a/requireable/nodejs/module',
path        = core.locate('core/path'),
resolvable  = path.isResolvable(filename)
```

In above example, the variable `resolvable` is of boolean type, true if the filename can be required.
