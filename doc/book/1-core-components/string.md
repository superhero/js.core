# String

The `core/string` component is an aggregated instance that exposes functionality that operates in relation to the javascript `string` type.

---

### `composeFirstUpperCase`

This method will make the whole string lowercase, except for the first letter that will be composed as uppercase.

```js
core.locate('core/string').composeFirstUpperCase('fooBar')
// > 'Foobar'
```

---

### `composeSeperatedLowerCase`

Composes a lower cased string that is seperated by defined seperator.

```js
core.locate('core/string').composeSeperatedLowerCase('Foo BAR baz')
// > 'foo-bar-baz'

core.locate('core/string').composeSeperatedLowerCase('Foo BAR baz', '.')
// > 'foo.bar.baz'
```

---

### `composeCamelCase`

Will compose a string that is lowercased string where each segment is uppercased, then glued together with no seperation, concatting the segments to one camelcased segment.

```js
core.locate('core/string').composeCamelCase('Foo BAR baz')
// > 'fooBarBaz'
```
