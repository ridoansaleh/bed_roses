const path = require( "path" );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require('webpack-node-externals');
const devMode = process.env.NODE_ENV !== "production";

const clientConfig = {
  mode: devMode ? "development" : "production",
  context: path.resolve(__dirname, "src"),
  devtool: devMode ? "none" : "source-map",
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
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css' // devMode ? '[name].css' : '[name].[hash].css',
      // chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    })
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  }
};

// const serverConfig = {
//   mode: devMode ? "development" : "production",
//   context: path.resolve(__dirname, "src"),
//   devtool: devMode ? "none" : "source-map",
//   target: 'node',
//   externals: [nodeExternals()],
//   entry: {
//     server: "./server.js",
//   },
//   resolve: {
//     modules: [
//       path.resolve( "./src" ),
//       "node_modules",
//     ],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: "babel-loader",
//       }
//     ],
//   },
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "[name].bundle.js"
//   }
// };

module.exports = clientConfig
