# Eventbus

The `core/eventbus` component is a bus that extends the `events` module in NodeJs. If no observer is attached to the event that is being emitted, then a warning will be written to the console, through the `core/console` component.

```js
const eventbus = core.locate('core/eventbus')

eventbus.on('foo', (event) => /* ... */)
eventbus.emit('foo', 'bar')
```

In above example, the `event` argument passed to the observer hold the string value `bar`.

---

## Mapping an observer to listen to an event

You can define observers in the configuration file of a component you add to the core context, under the namespace `core.eventbus.observers`. Below follows an example of a configuration that attaches an observer to the eventbus.

```js
{
  core:
  {
    eventbus:
    {
      observers:
      {
        'foobar': { 'foobar/observer' : true }
      }
    },
    locator:
    {
      'foobar/observer' : '/absolute/path/to/observer'
    }
  }
}
```

As seen by the example above, we define an observer called `foobar/observer` that we map to observe the event `foobar`. We rely on the locator to locate the observer for us. Locating the observer, and attaching the observer to observe the event, will take place during the core bootstrap process.

The trueful flag in the mapper is indicating that the observer will observe the event. It is sometimes necessery to deactivate some observers when for instance running in a test environment. If you need to deactivate an observer, set the flag to false.

---

## The observer interface

An observer is a class that follows a simple interface. The class must have an `observe` method that accepts 2 arguements, the emitted data and the eventName of the triggered event.

```js
class Observer
{
  observe(data, eventName)
  {
    /* ... */
  }
}
```

---

## Alternative observer interface

Alternative an observer can follow a naming convention on the interface, defining a method that is prefixed with the keyword `on` - followed by a camelcased version of the eventname. So for example, the event `foo bar` woukld be mapped to the method `onFooBar`, as the following example describes.

```js
class Observer
{
  onFooBar(data, eventName)
  {
    /* ... */
  }
}
```
