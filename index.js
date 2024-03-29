const path = require('path')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const webpack = require('webpack')

function getModeName() {
  const index = process.argv.indexOf('--mode')
  return index === -1 ? '' : process.argv[index + 1] || ''
}

function loadEnvironment(envPath) {
  try {
    const env = dotenv.config({ path: envPath, debug: process.env.DEBUG })
    dotenvExpand(env)
  } catch (err) {
    // only ignore error if file is not found
    if (err.toString().indexOf('ENOENT') < 0) {
      throw new Error(err.toString())
    }
  }
}

function overrideCracoConfig({ cracoConfig, pluginOptions = {} }) {
  const mode = getModeName()

  const envDirOption = pluginOptions.envDir
  const resolvedRoot = process.cwd()

  const basePath = path.resolve(
    envDirOption ? path.resolve(resolvedRoot, envDirOption) : resolvedRoot,
    `.env${mode ? `.${mode}` : ''}`
  )
  const localPath = `${basePath}.local`

  loadEnvironment(localPath)
  loadEnvironment(basePath)

  if (pluginOptions.variables) {
    const plugin = new webpack.EnvironmentPlugin(pluginOptions.variables)

    if (cracoConfig.webpack) {
      if (cracoConfig.webpack.plugins) {
        const webpackPlugins = cracoConfig.webpack.plugins
        ;(webpackPlugins.add || webpackPlugins).push(plugin)
      } else {
        cracoConfig.webpack.plugins = [plugin]
      }
    } else {
      cracoConfig.webpack = {
        plugins: [plugin],
      }
    }
  }

  return cracoConfig
}

module.exports = {
  overrideCracoConfig,
}
