/* eslint-disable */

const { merge } = require('webpack-merge')
const common = require('./webpack.config.common.js')

const path = require('path')

module.exports = merge(common, {
  mode: 'production',

  output: {
    path: path.resolve(__dirname),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
})