import { IClocLanRule, ClocLanRuleList, ICommentRule } from './rules'
import fs from 'fs'

export interface IClocFileInfo extends Pick<IClocLanRule, 'lan'> {
  files: number
  blank: number
  comment: number
  code: number
}

export function handleClocCommentRule(
  fileString: string,
  commentRule: ICommentRule
): string[] {
  // 单行注释数组
  const sComment = [...(fileString.match(commentRule.single) || [])]
  // 多行注释数组
  const mComment = [...(fileString.match(commentRule.multiple) || [])]
    .map((val) => val.split('\n'))
    .flat()
  return sComment.concat(mComment)
}

export function execCommentRule(
  fileString: string,
  rule: IClocLanRule
): string[] {
  const { comment } = rule.use
  // 总注释组
  let totalComment: string[] = []
  if (typeof comment === 'function') {
    totalComment = comment(fileString)
  } else {
    totalComment = handleClocCommentRule(fileString, comment)
  }
  return totalComment
}

function execClocLanRule(
  files: string[],
  rules: IClocLanRule[]
): IClocFileInfo[] {
  const clocFileInfoList: IClocFileInfo[] = []
  rules.forEach((rule) => {
    // 暂时保存每一次rule产生的file info 方便后面计算
    const clocFileInfoListTemp: IClocFileInfo[] = []
    // 对文件进行分类，决定该规则应该作用的文件
    const filteredFiles = files.filter((file) => rule.test.test(file))
    // 统计过滤后的文件中的各项数值
    filteredFiles.forEach((filteredFile) => {
      // 获取file string
      const fileString = fs.readFileSync(filteredFile, { encoding: 'utf-8' })
      // 文件行数数组
      const lines = fileString.split('\n')
      // 空行行数数组
      const blanks = lines.filter((item) => item.trim() === '')
      // 需要传给comment处理的不含空行的fileString
      const fileStringWithoutBlank = lines.filter((item) => item.trim() !== '').join('')
      // 总注释数组
      const comment = execCommentRule(fileStringWithoutBlank, rule)
      // 有效代码行数
      const codeLen = lines.length - comment.length - blanks.length
      // 存入info暂存区
      clocFileInfoListTemp.push({
        lan: rule.lan,
        files: 1,
        blank: blanks.length,
        comment: comment.length,
        code: codeLen,
      })
    })
    const fileRes = clocFileInfoListTemp.reduce(
      (pre, curr) => {
        return {
          lan: rule.lan,
          files: pre.files + curr.files,
          blank: pre.blank + curr.blank,
          comment: pre.comment + curr.comment,
          code: pre.code + curr.code,
        }
      },
      { lan: rule.lan, files: 0, blank: 0, comment: 0, code: 0 }
    )
    clocFileInfoList.push(fileRes)
  })
  return clocFileInfoList
}

export { ClocLanRuleList, execClocLanRule }
