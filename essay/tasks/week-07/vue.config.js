const {
  defineConfig
} = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    proxy: {
      '/api/article': {
        target: 'https://assets.kscampus.io:10443',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src/assets')
      }
    }
  }
})
