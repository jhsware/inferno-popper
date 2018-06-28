const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/app.jsx')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
    }]
  }
}
