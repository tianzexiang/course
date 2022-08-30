const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3280',
        changeOrigin: true
      }
    }
  }
})
