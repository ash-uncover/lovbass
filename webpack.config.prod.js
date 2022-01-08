/* eslint-disable */

const { merge } = require('webpack-merge')
const common = require('./webpack.config.common.js')

const path = require('path')
const dir_build = path.resolve(__dirname, 'docs')

module.exports = merge(common, {
  mode: 'production',

  output: {
    path: dir_build,
    filename: 'bundle.js',
    publicPath: './',
  },
})