import chalk from 'chalk'

export interface IStyle {
  bgColor?: string
  color?: string
  font?: string
}

// 设置样式
export function setStyle(value: string, valueStyle: IStyle = {}) {
  const { bgColor, color, font } = valueStyle
  // 过滤没有的样式
  const filteredStyle = [bgColor, color, font].filter(Boolean)
  const valueQueue: string[] = [value]
  // 如果没有设置样式
  if (filteredStyle.length === 0) return value
  else {
    // 依次执行样式
    filteredStyle.forEach((style) => {
      const _value = valueQueue.shift()
      valueQueue.push(chalk[style](_value))
    })
    return valueQueue.shift()
  }
}
