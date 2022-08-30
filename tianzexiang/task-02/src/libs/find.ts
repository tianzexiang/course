import chalk from 'chalk'
import * as fs from 'fs'
import * as path from 'path'
import { ParsedArgs } from 'minimist'

/**
 * 递归查找
 * @param dir
 * @param name
 */
function find(dir: string, name: string) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    const isDirectory = stat.isDirectory()
    if (isDirectory === false && file.includes(name)) {
      const output = path.join(dir, file.replaceAll(name, chalk.bgGreen(name)))
      console.log(output)
    }
    if (isDirectory === true) {
      find(fullPath, name)
    }
  }
}
/**
 * 文件搜索
 * @param args
 * @returns
 */
export default function (args: ParsedArgs) {
  let name = args._[0]
  if (!name) {
    return console.log(chalk.red('name required'))
  }
  find(process.cwd(), name)
}
