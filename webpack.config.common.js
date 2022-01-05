/* eslint-disable */

const webpack = require('webpack')
const path = require('path')

const dir_build = path.resolve(__dirname, 'dist')
const dir_src = path.resolve(__dirname, 'src')
const node_modules = path.resolve(__dirname, 'node_modules')
const pathToReact = path.resolve(node_modules, 'react/dist/react.min.js')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {

  entry: path.resolve(dir_src, 'index.js'),

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: 'Love Bass',
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, '_redirects'), },
        { from: 'src/assets', to: 'assets' }
      ],
    }),
  ],

  output: {
    path: dir_build,
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.js.map',
    publicPath: '/',
  },

  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /.(jsx|js)$/,
        include: dir_src,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.(less|css)$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]'
        },
      },
      {
        test: /\.(_redirects)$/i,
        type: 'asset/resource',
      },
    ],
    noParse: [pathToReact],
  },
}
