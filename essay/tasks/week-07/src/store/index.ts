import { defineStore, createPinia } from 'pinia'
import type { App } from 'vue'
import { PageNameEnum } from '@/enums/pageEnum'

const pinia = createPinia()
export type TTabName = PageNameEnum.GOOD_ARTICLE | PageNameEnum.HOT_NEWS

// configure tabs
export const useCommunityStore = defineStore('community', {
  state: ():{tabActived: TTabName} => {
    return {
      tabActived: PageNameEnum.GOOD_ARTICLE
    }
  }
})

// register store
export function setupStore (app: App) {
  app.use(pinia)
}
