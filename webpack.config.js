const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.resolve(__dirname,'public/js'),
    publicPath: '/public/js',
    filename: 'bundle.js',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
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
    static: './public',
    compress: true,
    hot: true,
    open: true,
    port: 3000,
    historyApiFallback: true
  }
}