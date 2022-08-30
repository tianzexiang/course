import { ParsedArgs } from 'minimist'
import fs from 'fs'
import path from 'path'
import { sort as handleSort } from '../utils/tools/'
import { printTable, TTableData } from '../utils/table'
import { getDirname, getFileSize, getFilename, getMtime } from '../utils/files'
import { getFormatTime } from '../utils/time'

interface ILsArgs extends ParsedArgs {
  sort?: 'mtime' | 'name' 
  order?: 'desc' | 'asc' 
}
interface IFilesAndDirs {
  dirs: string[]
  files: string[]
}
interface IFileBaseInfo {
  name: string
  size?: number
  mtime: number
}
const log = console.log

/**
 * 搜索目标路径下所有文件和目录
 * @param dir: 目标路径
 */
function findAll(dir: string): IFilesAndDirs {
  const result: IFilesAndDirs = {
    dirs: [],
    files: [],
  }
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    const isDirectory = stat.isDirectory()
    if (isDirectory === false) {
      result.files.push(fullPath)
    }
    if (isDirectory === true) {
      result.dirs.push(fullPath)
    }
  }
  return result
}

/**
 * 按选项打印目标路径下所有文件和目录
 * @param res: 排序好后的结果
 */
function printLsRes(res: IFileBaseInfo[]) {
  const tableTitle = ['LastWriteTime', 'Length', 'Name']
  const tableData = res.map<TTableData<IFileBaseInfo>>((data) => ({
    mtime: {
      value: getFormatTime(data.mtime),
      font: data.size ? '' : 'italic',
      color: data.size ? '' : 'blue',
    },
    size: {
      value: data.size ? String(data.size) : '/',
      font: data.size ? '' : 'italic',
      color: data.size ? '' : 'blue',
    },
    name: {
      value: data.name,
      font: data.size ? '' : 'italic',
      color: data.size ? '' : 'blue',
    },
  }))
  log('')
  printTable(tableData, tableTitle, {
    titleAlign: 'center',
    titleIndent: 4,
  })
  log('')
}

/**
 * 枚举文件
 * @param args 命令行参数
 */
export default function ls(args: ILsArgs) {
  // 解析命令行参数
  const { _, ...restArgs } = args
  const { sort = 'name', order = 'asc' } = restArgs
  // 最终排序结果
  let res: IFileBaseInfo[] = []
  // 获取当前路径所有所需数据
  const { dirs, files } = findAll(process.cwd())
  const dirInfoList: IFileBaseInfo[] = dirs.map((dir) => ({
    name: getDirname(dir),
    mtime: getMtime(dir),
  }))
  const fileInfoList: IFileBaseInfo[] = files.map((file) => ({
    name: getFilename(file),
    mtime: getMtime(file),
    size: getFileSize(file),
  }))
  // 排序
  if (sort === 'name') {
    handleSort(dirInfoList, sort, { order })
    handleSort(fileInfoList, sort, { order })
    res = dirInfoList.concat(fileInfoList)
  } else if (sort === 'mtime') {
    res = dirInfoList.concat(fileInfoList)
    handleSort(res, sort, { order })
  }
  // 打印结果
  printLsRes(res)
}
