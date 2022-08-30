/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}