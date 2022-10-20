const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },{
        test: /\.scss$/,
        use: [{
        loader: MiniCssExtractPlugin.loader
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
  externals:{
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.prod.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'main-bundle-[contenthash].css'
    })
  ]
});