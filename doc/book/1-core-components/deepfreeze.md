# Deepfreeze

This components purpose is to freeze an object, and all nested ansestors, that is passed to the method `freeze`. The difference between this component and the normal JavaScript implementation; `Object.freeze(obj)`, is that the `core/deepfreeze` component will freeze every nested object, where `Object.freeze(obj)` will only freeze the passed reference and none of its ansestors.

```js
const
foobar      = { foo:{ bar:'baz' } },
deepfreeze  = core.locate('core/deepfreeze')

deepfreeze.freeze(foobar)

foobar.foo.bar = 'qux'

foobar.foo.bar === 'qux'
// > false
foobar.foo.bar === 'baz'
// > true
```

As the example above shows, when an object is frozen, it is rendered imutable, and the value can no longer be altered.
