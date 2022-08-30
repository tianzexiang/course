import { request } from './util'

describe('歌手模块', () => {
  test('获取歌手列表', async () => {
    const { data } = await request.get('/api/v1/singer/list')
    expect(data.code).toBe(0)
    expect(data.data.items.length).toBeGreaterThan(0)
  })
})
