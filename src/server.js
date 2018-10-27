import express from "express";
import path from "path";
import webpackConfig from '../webpack.config.client'
const render = require('./dist/server.bundle')

const app = express();

const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  // publicPath: webpackConfig.output.publicPath,
}));

app.use(express.static(path.resolve(__dirname, "../dist")));

app.get( "/*", render);

app.listen(3000, function() {
  console.log('Your server is running on 3000');
});
