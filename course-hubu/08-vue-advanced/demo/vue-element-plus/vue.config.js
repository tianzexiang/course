const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api/article": {
        target: "https://assets.kscampus.io:10443",
        changeOrigin: true,
      },
      "/api/": {
        target: "http://localhost:3361",
        changeOrigin: true,
      },
    },
  },
});
