import { ParsedArgs } from 'minimist'
import { isDir, isExist } from '../utils/files'
import fs from 'fs'
import path from 'path'
import { printTable, TTableData } from '../utils/table'
import {
  ClocLanRuleList,
  execClocLanRule,
  IClocFileInfo,
} from '../utils/cloc-lan-rule'
import { sort as handleSort } from '../utils/tools'
import chalk from 'chalk'

interface IClocArgs extends ParsedArgs {
  sort?: 'files' | 'blank' | 'comment' | 'code'
  order?: 'desc' | 'asc'
}
const log = console.log

/**
 * 打印处理文件信息
 * @param files 所有文件
 * @param res 处理过后的结果
 * @param time 处理文件所花费的时间
 */
function printClocResInfo(
  files: string[],
  sumFileInfo: IClocFileInfo,
  time: number
) {
  // 所有文件数
  const allFilesLen = files.length
  // 处理的文件数
  const concludedFilesLen = sumFileInfo.files
  // 忽略的文件数
  const ignoredFilesLen = allFilesLen - concludedFilesLen
  // 总时间（秒）
  const totalTime = (time / 1000).toFixed(3)
  // 总行数
  const allLinesLen = sumFileInfo.blank + sumFileInfo.code + sumFileInfo.comment
  // 平均每秒处理的文件
  const filesPerSecond = ((concludedFilesLen * 1000) / time).toFixed(2)
  // 平均每秒处理的行数
  const linesPerSecond = ((allLinesLen * 1000) / time).toFixed(2)
  log(
    `${chalk.bold.green(allFilesLen)} files in total, ${chalk.bold.red(
      ignoredFilesLen
    )} files ignored\ntime=${chalk.italic.green(
      totalTime
    )}s, ${chalk.italic.green(filesPerSecond)} files/s, ${chalk.italic.green(
      linesPerSecond
    )} lines/s`
  )
}

/**
 * 打印文件code信息
 * @param res 处理过后的结果
 */
function printClocFilesInfo(res: IClocFileInfo[]) {
  const tableData = res.map<TTableData<IClocFileInfo>>((val) => ({
    lan: {
      value: val.lan,
    },
    files: {
      value: String(val.files),
    },
    blank: {
      value: String(val.blank),
    },
    comment: {
      value: String(val.comment),
    },
    code: {
      value: String(val.code),
    },
  }))
  printTable(tableData, ['Language', 'files', 'blank', 'comment', 'code'], {
    titleAlign: 'center',
    footer: true,
    titleIndent: 2,
    showTopBottomDivider: true,
  })
}

/**
 * 处理文件
 * @param files 所有文件
 * @param args 命令行参数
 */
function handleFiles(files: string[], args: IClocArgs) {
  // 获取排序参数
  const { sort = 'files', order = 'desc' } = args
  const lastTime = Date.now()
  const res = execClocLanRule(files, ClocLanRuleList)
  const currTime = Date.now()
  const time = currTime - lastTime
  const sumFileInfo = res.reduce(
    (pre, curr) => {
      return {
        lan: 'SUM',
        files: pre.files + curr.files,
        blank: pre.blank + curr.blank,
        comment: pre.comment + curr.comment,
        code: pre.code + curr.code,
      }
    },
    { lan: 'SUM', files: 0, blank: 0, comment: 0, code: 0 }
  )
  handleSort(res, sort, { order })
  log('')
  printClocResInfo(files, sumFileInfo, time)
  printClocFilesInfo([...res, sumFileInfo])
  log('')
}

/**
 * 得到目标路径下所有文件
 * @param target: 当前路径下的目标文件夹或文件
 * @param res: 存放所有搜索文件结果
 * @param exclude: 当前路径下搜索时应排除的文件
 */
function getAllFiles(target: string, res: string[], exclude: string[] = []) {
  // 查看文件或文件夹是否被排除
  const absolutePathExclude = exclude.map((excl) =>
    path.join(process.cwd(), excl)
  )
  if (absolutePathExclude.includes(target)) return
  // 未被排除
  if (isDir(target)) {
    const files = fs.readdirSync(target)
    const absolutePathFiles = files.map((file) => path.join(target, file))
    absolutePathFiles.forEach((file) => getAllFiles(file, res, exclude))
  } else {
    res.push(target)
  }
}

/**
 * 统计代码行数
 * @param args 命令行参数
 */
export default function cloc(args: IClocArgs) {
  // 获取目标文件或文件夹
  const { _ } = args
  const arg = _[0]
  if (arg && isExist(arg)) {
    const files: string[] = []
    getAllFiles(path.join(process.cwd(), arg), files)
    handleFiles(files, args)
  } else return log(chalk.red('该目录下找不到目标文件或文件夹'))
}
