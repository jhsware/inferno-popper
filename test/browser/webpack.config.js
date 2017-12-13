const webpack = require('webpack')
const path = require('path')

const babelPlugins = [
  'babel-plugin-transform-object-rest-spread',
  'babel-plugin-syntax-jsx',
  "add-module-exports",
  [
    'babel-plugin-inferno',
    {
      'imports': true
    }
  ]
]

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
      query: {
        plugins: babelPlugins
      }
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        plugins: babelPlugins
      }
    }]
  }
}
