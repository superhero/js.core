# Console

The console component is an extension of the `@superhero/debug` module at npm. Go check out the documentation for that module to find out more specificly the current possible settings and abilities to work with this component. If I where to write the full documentations here as well, I will have to maintan 2 different sets of documentations.

In this documentation you will however learn simple behaviour, how to integrate with the component through the configuration file and what the altered default behaviour from the extended module is.

---

## Simple behaviour

The purpose of the component is to log a message, by default to the `stdout` and `stderr`, but they can both be configured to any writable stream.

```js
core.locate('core/console').log('Hello World')
```

Above example will ouput `2019-09-02 13:26:41	Hello World`. As you can see, a prefixed timestamp is added by default.

---

## Configure the component

The configuration structure can be altered by writing over the namespace `core.console` in the configuration settings, defined in one of the aded components you add to your application.

```js
{
  core:
  {
    console:
    {
      color           : false,
      maxArrayLength  : 10,
      maxObjectDepth  : 10,
      maxStringLength : false
    }
  }
}
```

Above example shows a configuration that alters the default settings. `color` is set to false toturn of coloring of the output. `maxArrayLength` and `maxObjectDepth` determines how many items of an array or object will be printed. `maxStringLength` set to false will turn of the behaviour that by default truncates a string to set length.

There are more settings then this that you can play around with, see the documention of the `@superhero/debug` module to learn more.

---

## Altered default behaviour

The difference between the `@superhero/debug` module at npm and the component in this framework, is the color and prefix that will be used when using the methods `error` and `warning`.

```js
const console = core.locate('core/console')

console.warning('Something strange has happend')
console.error('Meltdown!')
```

Above example will output the following to the terminal.

```
2019-09-02 13:26:41	Warning:	Something strange has happend
2019-09-02 13:26:41	Error:	Meltdown!
```

The above output will be in yellow for warning, and in red for error.
