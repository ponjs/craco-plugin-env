const path = require("path");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const webpack = require("webpack");

function getModeName() {
    const index = process.argv.indexOf("--mode");
    return index === -1 ? "" : process.argv[index + 1] || "";
}

function loadEnvironment(envPath, dotenvOptions = {}) {
    try {
        const env = dotenv.config({ ...dotenvOptions, path: envPath });
        dotenvExpand(env);
    } catch (err) {
        // only ignore error if file is not found
        if (err.toString().indexOf("ENOENT") < 0) {
            throw new Error(err.toString());
        }
    }
}

const defaultOptions = {
    rootDir: process.cwd(),
    mode: "",
    variables: null,
    dotenvConfig: { debug: process.env.DEBUG || false, override: false, encoding: "utf8" }, // no path option
};

function overrideCracoConfig({ cracoConfig, pluginOptions = {} }) {
    const options = {
        ...defaultOptions,
        ...pluginOptions,
        dotenvConfig: { ...defaultOptions.dotenvConfig, ...pluginOptions.dotenvConfig },
    };
    const mode = getModeName() || options.mode;

    const basePath = path.resolve(options.rootDir, `.env${mode ? `.${mode}` : ""}`);
    const localPath = `${basePath}.local`;

    loadEnvironment(basePath, options.dotenvConfig);
    loadEnvironment(localPath, options.dotenvConfig);

    if (options.variables) {
        const plugin = new webpack.EnvironmentPlugin(options.variables);

        if (cracoConfig.webpack) {
            if (cracoConfig.webpack.plugins) {
                const webpackPlugins = cracoConfig.webpack.plugins;
                (webpackPlugins.add || webpackPlugins).push(plugin);
            } else {
                cracoConfig.webpack.plugins = [plugin];
            }
        } else {
            cracoConfig.webpack = {
                plugins: [plugin],
            };
        }
    }

    return cracoConfig;
}

module.exports = {
    overrideCracoConfig,
};
