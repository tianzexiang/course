import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 引入本地化

dayjs.locale('zh-cn') // 使用本地化

// 毫秒格式化
export function formatUnixTime (millisecondUnix: number, format = 'YYYY/MM/DD HH:mm:ss') {
  return dayjs(millisecondUnix).format(format)
}
