const path = require('path')
const resolve = dir => path.join(__dirname, dir)
// const BASE_URL = process.env.Node_ENV === 'procution' ? '/' : '/'
module.exports = {
  lintOnSave: true,
  publicPath: '/',
  outputDir: 'xiche',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api/': {
        target: 'http://192.168.0.120:82/',
        changeOrigin: true
      },
      '/images/': {
        target: 'http://192.168.0.120:82/',
        changeOrigin: true
      }
    },
    port: '80'
  }
}
