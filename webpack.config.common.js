const path = require('path');

module.exports = {
  commonLoaders: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: path.join(__dirname, '..', 'node_modules'),
    },
  ],
};
