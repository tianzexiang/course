// 格式化时间
function getFormatTime(date: number) {
  const _date = new Date(date)
  const year = _date.getFullYear()
  const month =
    _date.getMonth() < 10 ? `0${_date.getMonth()}` : _date.getMonth()
  const day = _date.getDay() < 10 ? `0${_date.getDay()}` : _date.getDay()
  const hours =
    _date.getHours() < 10 ? `0${_date.getHours()}` : _date.getHours()
  const minutes =
    _date.getMinutes() < 10 ? `0${_date.getMinutes()}` : _date.getMinutes()

  return `${year}-${month}-${day} ${hours}:${minutes}`
}

export {
  getFormatTime
}