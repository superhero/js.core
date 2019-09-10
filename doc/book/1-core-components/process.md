# Process

The `core/process` component is an aggregated instance that exposes functionality in relation to the process that the script is running in.

---

### `exit`

A wrapper for the NodeJs `process.exit` method. Simply exit the process by running the method `exit`.

```js
core.locate('core/process').exit()
```

---

## Bootstrap

The component will attach a listener to the process `unhandledRejection` and
`uncaughtException` events. The implementation will throw the errors to the scoped `domain` - if present, else to the `core/eventbus` component as the event `core.error`.
