var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.NODE_ENV || 'development';
var development = env === 'development';
var production = env === 'production';

var loaders = {
  js: {
    test: /\.js$/,
    loaders: ['babel'],
    exclude: /node_modules/
  }
};

if (development) {
  loaders.js.loaders.unshift('react-hot');
}

var config = module.exports = {
  devtool: development ? '#source-maps' : null,
  context: __dirname,
  entry: [
    './app/index.js'
  ],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    loaders: Object.keys(loaders).map(function(key) {
      return loaders[key];
    })
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new ExtractTextPlugin('app.css', {
      allChunks: true
    })
  ]
};

if (development) {
  config.entry = config.entry.concat([
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server'
  ]);
  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]);
} else if (production) {
  config.plugins = config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]);
}
