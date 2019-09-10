# CLI

The `core/cli` component offers the ability to write a command line interface application. The component is for you who want to write an application that can be interacted with through a command line interface in the terminal.

---

## Write

```js
const cli = core.locate('core/cli')
cli.write('Hello World')
```

The above example will have the following output.

```
Hello World
```

---

## Output in color

You can also specify a color of the output by passing an additional argument to the write method.

```js
cli.write('Hello World', 'blue')
```

The above example will have the following output, but in blue color...

```
Hello World
```

The possible color values follows below.

- black
- blue
- cyan
- green
- magenta
- red
- yellow
- white

---

## Question

It is possible for you to ask for input from the client. You do so by asking a question.

```js
const answer = await cli.question('What is the meaning of life?')
```

The expected output is the same as previous examples.

```
What is the meaning of life?
```

The process will wait for the client to write an input, followed by the enter button that will return the value to the `answer` variable. The method is asynchronous.

---

## Autocomplete

If you like to narrow down the availible answers you can pass along an array of acceptable answers.

```js
const answer = await cli.question('Keep it real?', ['yes', 'no'])
```

With the alternatives defined, you can write the beginning of an  accepted answer followed by hitting the tab key, then the line will be auto completed with the complete answer.

As the example below shows, if the answer provided is not acceptable, alternatives will be written to the output, followed by the same question again.

```
Keep it real? maybe
You must chose one of the alternatives yes or no
Keep it real?
```

It is also possible to see all accepteable answers by double tapping the tabb key, expected output follows below.

```
Keep it real?
yes  no
Keep it real?
```
