const filterRegex = [
  /<style[^>]*>[^]*?<\/[^>]*style>/g, // 取出多行style
  /<style[^>]*>/gm, // 取出单行style
  /<i?frame[^>]*>[^]*?<\/[^>]*i?frame>/g, // 取出多行iframe
  /<i?frame[^>]*>/gm, // 取出单行iframe,
  /<script[^>]*>[^]*?<\/[^>]*script>/g, // 取出多行script
  /<script[^>]*>/gm, // 取出单行script,
  /<link[^>]*>/gm, // 取出单行link,
  /<form[^>]*>/gm, // 取出单行form,
]

export function filterHtml(content: string) {
  const stack = [content]
  for (const reg of filterRegex) {
    const _content = stack.pop() as string
    stack.push(_content.replaceAll(reg, ''))
  }
  return stack.pop() as string
}
