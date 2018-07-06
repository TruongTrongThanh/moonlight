const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /logo\./,
        loader: 'file-loader?name=favicon.ico'
      },
      {
        test: /\.svg$/,
        loader: 'file-loader'
      }
    ]
  },
  output: {
    publicPath: '/dist/',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['*', '.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, '../src/components'),
      Pages: path.resolve(__dirname, '../src/pages'),
      Assets: path.resolve(__dirname, '../src/assets'),
      vue$:'vue/dist/vue.common.js'
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  stats: 'errors-only'
}