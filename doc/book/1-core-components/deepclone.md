# Deepclone

The purpose of the component is to clone an object and all its ancestor. The interface is as the example below shows.

```js
const
foobar      = { foo:{ bar:'baz' } },
deepclone   = core.locate('core/deepclone'),
foobarClone = deepclone.clone(foobar)

foobar.foo.bar === foobarClone.foo.bar
// > true

foobar.foo.bar = 'qux'
foobar.foo.bar === foobarClone.foo.bar
// > false
```

The above example proves that the nested ancestor `foo.bar` in the clone, is not a reference to the same memory space.
