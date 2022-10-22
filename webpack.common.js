const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/main/index.tsx',
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'main-bundle-[fullhash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins:[
    new CleanWebpackPlugin(),
    new Dotenv()
  ]
}