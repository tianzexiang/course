const {
  defineConfig
} = require('@vue/cli-service')
const path = require('path')
// webpack 自动导入
const AutoImport = require('unplugin-auto-import/webpack')
// webpack 组件自动注册
const Components = require('unplugin-vue-components/webpack')
const {
  ElementPlusResolver
} = require('unplugin-vue-components/resolvers')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  devServer: {
    open: true,
    port: 8080,
    // host: '192.168.101.139', // 在此处设置本机无线局域网IPv4 地址
    host: '127.0.0.1',
    // 设置代理跨域
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true
      }
    }
  },
  pluginOptions: {
    // 引入全局less样式
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/styles/var/index.less')
      ]
    }
  },
  configureWebpack: {
    plugins: [
      // 按需引入elementplus
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        dts: true,
        dirs: ['src/components', 'src/views'], // 配置自动导入自定义组件
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
})
