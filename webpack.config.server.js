const path = require( "path" );
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require('webpack-node-externals');
const { commonLoaders } = require('./webpack.config.common');
const devMode = process.env.NODE_ENV !== "production";

const serverConfig = {
  mode: devMode ? "development" : "production",
  context: path.resolve(__dirname, "src"),
  // devtool: devMode ? "none" : "source-map",
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    server: "./serverNew.js",
  },
  resolve: {
    modules: [
      path.resolve( "./src" )
    ],
  },
  module: {
    rules: commonLoaders.concat([
      {
        test: /\.scss$/,
        use: [
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

module.exports = serverConfig
