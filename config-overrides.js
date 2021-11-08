const { override } = require("customize-cra");

module.exports = override(
    (config) => {
        config.optimization.runtimeChunk = false;
        config.optimization.splitChunks = {
            cacheGroups: {
                default: false,
            }
        };

        config.output.filename = "static/js/[name].js";
        return config;
    }
);