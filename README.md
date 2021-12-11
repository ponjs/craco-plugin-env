## Installation

```bash
$ yarn add craco-plugin-env -D

# OR

$ npm i craco-plugin-env -D
```

## Usage

在 `craco.config.js` 文件中添加插件。

```js
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

您可以传递一个 `options` 对象来配置插件。

- `options.path`
  - _Default:_ root
  - 用于加载 `.env` 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。
- `options.vars`
  - _Default_: `{}`
  - 自定义环境变量。通过 `process.env` 获取。想要了解解析环境文件规则的细节，请参考 [dotenv](https://github.com/motdotla/dotenv)。

## Mode

你可以在你的项目根目录中放置下列文件来指定环境变量：

```
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

你可以通过传递 `--mode` 选项参数为命令行覆写默认的模式。例如，如果你可以在构建命令中使用开发环境变量：

```diff
/* package.json */

"scripts": {
    "start": "craco start",
    "build": "craco build",
+   "build:dev": "craco build --mode development"
}
```

可参考 [Vue CLI](https://cli.vuejs.org/zh/guide/mode-and-env.html#模式)。
