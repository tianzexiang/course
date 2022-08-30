import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime) // 相对时间
dayjs.locale('zh-cn')

export function getLastTimeStr(
  millionSeconds: number,
  millionSecondsLimit: number
) {
  const isFriendly = Date.now() - millionSeconds <= millionSecondsLimit
  if (isFriendly) {
    return dayjs(millionSeconds).fromNow()
  }
  return dayjs(new Date(millionSeconds)).format('YYYY-MM-DD HH:mm')
}

export function getMilliseconds(time: Date) {
  return dayjs(time).valueOf()
}
