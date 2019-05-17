const path = require('path')
const autoprefixer = require('autoprefixer')
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin")

module.exports = {
  chainWebpack: config => {
    config.module
      .rules
      .delete('eslint')
    config.module
      .rule('vue')
      .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          options.shadowMode = true
          return options
        })
    config.module
      .rule('css')
      .oneOf('vue')
      .use('vue-style-loader')
        .tap(options => {
          options.shadowMode = true
          return options
        })
    config.module
      .rule('scss')
      .oneOf('vue')
      .use('vue-style-loader')
        .tap(options => {
          options.shadowMode = true
          return options
        })
    config.resolve.alias
      .set('vue-custom', path.resolve(__dirname, 'node_modules/vue'))
  },
  css: {
    modules: true,
    loaderOptions: {
      sass: {
        includePaths: ['node_modules']
      },
      postcss: {
        plugins: () => [autoprefixer()]
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  configureWebpack: {
    entry: './entry.js',
    output: {
      filename: '[name].js',
      library: "LIB",
      libraryTarget: "var"
    },
    plugins: [
      new EsmWebpackPlugin()
    ]
  }
}