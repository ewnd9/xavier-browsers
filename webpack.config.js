var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    content: './src/js/content.js',
    background: './src/js/background.js',
    index: './src/js/index.js'
  },
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[file].map',
    path: './src/dist/js'
  },
  resolve: {
    root: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
    moduleDirectories: [
      'node_modules'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: []
};
