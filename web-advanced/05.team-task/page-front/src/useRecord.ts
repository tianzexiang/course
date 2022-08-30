import { useCallback, useEffect, useState } from 'react'

export default function useRecord() {
  const [items, setItems] = useState<IRecord[]>([])
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)

  const list = useCallback(
    async (
      options: {
        next?: string
        prev?: string
      } = {}
    ) => {
      const params = new URLSearchParams()
      if (options.next) params.set('next', options.next)
      if (options.prev) params.set('prev', options.prev)
      const url = `/api/v1/record/list?${params.toString()}`
      const resp = await fetch(url)
      const data: ApiResp<IListResp> = await resp.json()
      if (data.code === 0) {
        setItems(data.data.items)
        setHasNext(data.data.hasNext)
        setHasPrev(data.data.hasPrev)
      }
    },
    []
  )

  const listNext = useCallback(() => {
    if (items.length) {
      return list({
        next: items[items.length - 1]._id
      })
    }
  }, [items, list])

  const listPrev = useCallback(() => {
    if (items.length) {
      return list({
        prev: items[0]._id
      })
    }
  }, [items, list])

  useEffect(() => {
    list()
  }, [list])

  return {
    items,
    hasNext,
    hasPrev,
    list,
    listNext,
    listPrev
  }
}
