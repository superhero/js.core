# Code automation

The superhero library come with a CLI helper that can reduce redundant work. Using this helper is not required if you like to work with the library. The helper is only a suggested tool that could serve to aid a developer to hopefully progress productivity.

---

## Installation

The helper is mainly tested on different Debian based distributions (Linux). The helper probably work on other platforms as well, if you bump into problems, please help out by posting an issue on Github.

Install the package globally through the following command.

`npm install -g superhero`

---

## Navigation

Once the module is installed globally, you should be able to access the CLI helper by running the command `superhero` in the terminal. Below is an example of the expected output of the `superhero` command.

```
                                 __
     _______  ______  ___  _____/ /_  ___  _________
    / ___/ / / / __ \/ _ \/ ___/ __ \/ _ \/ ___/ __ \
   (__  ) /_/ / /_/ /  __/ /  / / / /  __/ /  / /_/ /
  /____/\__,_/ .___/\___/_/  /_/ /_/\___/_/   \____/
            /_/


1. Generate project
2. Generate API documentation
3. Generate API swagger documentation

Choose your destiny:
```

Different options are presented in a numbered list. You are asked to pick an alternative by writing the number of the navigation choice, followed by the `enter` key that will execute the choice.

### Autocomplete

In any form of choice list, it is possible to hit the tab key to autocomplete the option you already started writing.

### Options hint

When prompted with a navigation choice, where a choice from a predefined list is expected, it is possible to double-tab to display a list of valid options.

The list of alternatives is filtered by the defined prefix of the input written before asking for complementary options.

---

Read more about the different options in the main navigation list under one of the following sub-sections.

1. [Generate project](generate-project.md)
2. [Generate API documentation](generate-api-documentation.md)
4. [Generate API swagger documentation](generate-swagger.md)
