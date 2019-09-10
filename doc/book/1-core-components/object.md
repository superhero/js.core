# Object

The `core/object` component is an aggregated instance that exposes functionality that operates in relation to the js `Object` type.

---

### `composeLowerCaseKeyedObject`

The method `composeLowerCaseKeyedObject` will compose a cloned object where all the keys of the input object are returned with lower cased keys.

```js
const
obj       = { FooBar:'FooBar' },
object    = core.locate('core/object'),
composed  = object.composeLowerCaseKeyedObject(obj)
```

In the above example, value of the `composed` variable is as described below.

```js
{ foobar:'FooBar' }
```

---

### `composeObjectWithoutKeys`

The method `composeObjectWithoutKeys` is authored by Lleonard Subirana. The method will creates a copy of an object, excluding keys defined by the following arguments.

```js
const
obj       = { foo:123, bar:456, baz:789, qux:0 },
object    = core.locate('core/object'),
composed  = object.composeObjectWithoutKeys(obj, 'bar', 'baz')
```

In the above example, value of the `composed` variable is as described below.

```js
{ foo:123, qux:0 }
```

References are by design kept intact in the composed object, as the following example shows.

```js
const
obj       = { foo:{ bar:'baz' }, baz:456 },
object    = core.locate('core/object'),
composed  = object.composeObjectWithoutKeys(obj, 'baz')

obj.foo.bar = 'qux'
obj.foo.bar === composed.foo.bar
// > true
```
