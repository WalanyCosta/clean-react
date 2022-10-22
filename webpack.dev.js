const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },{
        test: /\.scss$/,
        use: [{
        loader: 'style-loader'
      },{
        loader: 'css-loader',
        options:{
          modules: true
        }
      },{
        loader: 'sass-loader',
        options:{
          implementation: require('sass')
        }
      }]
    }]
  },
  devtool:'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname,'dist/')
    },
    open: true,
    compress: true,
    port: 3000,
    historyApiFallback: true,
    devMiddleware: {
      index: true,
      mimeTypes: { phtml: 'text/html' },
      publicPath: '/dist',
      serverSideRender: true,
      writeToDisk: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.dev.html',
    })
  ]
});