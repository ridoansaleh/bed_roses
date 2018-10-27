const path = require( "path" );
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const nodeExternals = require('webpack-node-externals');
const { commonLoaders } = require('./webpack.config.common');
const devMode = process.env.NODE_ENV !== "production";

const clientConfig = {
  mode: devMode ? "development" : "production",
  context: path.resolve(__dirname, "src"),
  // devtool: devMode ? "none" : "source-map",
  entry: {
    app: "./client.js",
  },
  resolve: {
    modules: [
      path.resolve( "./src" ),
      "node_modules",
    ],
  },
  module: {
    rules: commonLoaders.concat([
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      }
    ])
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  }
};

module.exports = clientConfig
