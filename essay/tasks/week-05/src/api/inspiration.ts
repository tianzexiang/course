import { get } from '@/utils/http/fetch'
import type { IThumbnail } from '@/interfaces/dataTypes'

enum Api {
  GetThumbnailList = '/data/task.json'
}

export const getThumbnailList = () => {
  return get<IThumbnail[]>(Api.GetThumbnailList)
}
