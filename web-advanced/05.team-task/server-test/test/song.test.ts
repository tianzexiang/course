import { request } from './util'

describe('歌曲模块', () => {
  test('获取歌曲列表', async () => {
    const { data } = await request.get('/api/v1/song/list')
    expect(data.code).toBe(0)
    expect(data.data.items.length).toBeGreaterThan(0)
  })
  let createId = ''
  test('创建歌曲', async () => {
    const { data: singers } = await request.get('/api/v1/singer/list')
    const { data } = await request.post('/api/v1/song/create', {
      title: '测试歌曲',
      subtitle: 'test song',
      singerId: singers.data.items[0]._id,
      cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M0000042cH172YJ0mz_2.jpg',
      interval: 240
    })
    expect(data.code).toBe(0)
    createId = data.data._id
  })
  test('删除歌曲', async () => {
    const { data } = await request.post('/api/v1/song/remove', {
      _id: createId
    })
    expect(data.code).toBe(0)
  })
})
