# Http / Request

The component `core/http/request` is an extention of the fristanding `@superhero/request` module at npm. Go check out the documentation for that module to find out more specificly the current possible settings and abilities to work with this component.

This documentation will go through basic use of the component.

---

## Basic use

The purpose of the component is to make http requests.

```js
const result = await core.locate('core/http/request').get('http://example.com/')
```

In the above example, the value of the result variable contains the following value.

```js
{
  data    : '<html>...</html>',
  headers : { /* ... */ },
  status  : 200
}
```

---

## Configurations

You can specify options through the namespace `core.http.request.options`. See the `@superhero/request` module at npm for more information about different configurations you can set on construction. Below follows an example of how to set a few configurations through a component config file.

```js
{
  core:
  {
    http:
    {
      request:
      {
        options:
        {
          debug   : true,
          timeout : 60e3
        }
      }
    }
  }
}
```

Above example will configure the core contexts `core/http/request` component to print debuggable log messages to the console, and sets the timeout limit to 1 minute.
