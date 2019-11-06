const path = require('path')
const resolve = dir => path.join(__dirname, dir)
// const BASE_URL = process.env.Node_ENV === 'procution' ? '/' : '/'
module.exports = {
  lintOnSave: true,
  publicPath: '/',
  outputDir: 'fengdu',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  },
  productionSourceMap: false,
  devServer: {
    // proxy: 'https://fengdu.chrray.com',
    // proxy: 'http://192.168.0.121',
    proxy: {
      '/api/': {
        target: 'https://jyjm.cqfd.gov.cn',
        // target: 'http://192.168.0.130:8888',
        changeOrigin: true
      },
      '/uploadImage/': {
        target: 'https://jyjm.cqfd.gov.cn',
        // target: 'http://192.168.0.130:8888',
        changeOrigin: true
      }
    },
    port: '80'
  }
}
