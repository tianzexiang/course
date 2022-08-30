export {}

declare module 'vue-router' {
  // 定义路由meta
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // 当前页标题
    title: string
  }
}
