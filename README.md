## Installation

First, follow the [`craco` Installation Instructions](https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#installation) to install the `craco` package, create a `craco.config.js` file, and modify the scripts in your `package.json`.

Then install `craco-plugin-env`:

```bash
$ yarn add craco-plugin-env -D

# OR

$ npm i craco-plugin-env -D
```

## Usage

Add the plugin into your `craco.config.js`.

```js
/* craco.config.js */

const CracoEnvPlugin = require('craco-plugin-env')

module.exports = {
  plugins: [
    {
      plugin: CracoEnvPlugin,
      options: {
        path: __dirname,
        vars: {},
      },
    },
  ],
}
```

## Configuration

You can pass an `options` object to configure the plugin.

- `options.path`
  - _Default:_ root
  - The directory from which `.env` files are loaded. Can be an absolute path, or a path relative to the project root.
- `options.vars`
  - _Default_: `{}`
  - Custom environment variables. For more detailed env parsing rules, please refer to the documentation of [dotenv](https://github.com/motdotla/dotenv).

## Mode

You can specify env variables by placing the following files in your project root:

```
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
.env.[mode].local   # only loaded in specified mode, ignored by git
```

You can overwrite the default mode used for a command by passing the `--mode` option flag. For example, if you want to use development variables in the build command:

```diff
/* package.json */

"scripts": {
    "start": "craco start",
    "build": "craco build",
+   "build:dev": "craco build --mode development"
}
```

You can refer to the documentation of [Vue CLI](https://cli.vuejs.org/guide/mode-and-env.html#modes-and-environment-variables).
