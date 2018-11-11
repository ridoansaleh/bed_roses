const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const path = require("path");

const config = {
  mode: "development",
  entry: "./src/client.js",
  output: {
    filename: "app_bundle.js",
    // chunkFilename: "[id].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/"
  }
};

module.exports = merge(baseConfig, config);
