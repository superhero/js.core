# Code structure / By feature

Grouping logic by feature is often considered good practice, instead of the alternative segregation by layer. I belive there is truth in that, though I do not consider it true. These guidelines advocates that you do both.

Code sructured as logicly grouped by feature implies that you have a folder structure by resource, containing logic related to the resource titled. Example below is one such folder structure.

```
app
└── src
    ├── foo
    │   ├── controller.js
    │   ├── model.js
    │   └── view.js
    └── bar
        ├── controller.js
        ├── model.js
        └── view.js
```

In above example a simple MVC, **M**odel **V**iew **C**ontroller, pattern is used to segregate the different segments of the code related to the resource titled by the name in the folder. The example is a very simplistic model
