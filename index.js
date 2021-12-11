const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')

function getModeName() {
  const index = process.argv.indexOf('--mode')
  return process.argv[index + 1] || ''
}

function overrideCracoConfig({ cracoConfig, pluginOptions = {} }) {
  const mode = getModeName()

  const dir = pluginOptions.path || process.cwd()

  const basePath = path.resolve(dir, `.env${mode ? `.${mode}` : ''}`)
  const localPath = `${basePath}.local`

  const load = envPath => {
    try {
      const env = dotenv.config({ path: envPath, debug: process.env.DEBUG })
      return env.parsed
    } catch (err) {
      // only ignore error if file is not found
      if (err.toString().indexOf('ENOENT') < 0) {
        throw new Error(err.toString())
      }
    }
  }

  const plugin = new webpack.EnvironmentPlugin({
    ...pluginOptions.vars,
    ...load(basePath),
    ...load(localPath),
  })

  const originalPlugins = cracoConfig.webpack?.plugins

  if (originalPlugins) {
    if ('add' in originalPlugins) {
      originalPlugins.add.push(plugin)
    } else {
      originalPlugins.push(plugin)
    }
  } else {
    cracoConfig.webpack.plugins = { add: [plugin] }
  }

  return cracoConfig
}

module.exports = {
  overrideCracoConfig,
}
