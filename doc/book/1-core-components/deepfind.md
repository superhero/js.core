# Deepfind

The purpose of this component is to offer the ability to find a branch or a leaf in an object by specifed query. If you specify an incorrect query, you will be returned an undefined value.

```js
const
foobar    = { foo:{ bar:'baz' } },
deepfind  = core.locate('core/deepfind')

deepfind.find('foo.bar', foobar)
// > 'baz'

deepfind.find('foo/bar', foobar)
// > 'baz'

deepfind.find('none.existing.path', foobar)
// > undefined
```

As the above example shows, you can use different delimiters - *a dot `.` or a forward slash `/`* - to seperate the path segments in the query with the same result.
