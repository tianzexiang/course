import { ParsedArgs } from 'minimist'
import fs from 'fs'
import path from 'path'
import { isExist } from '../utils/files'
import chalk from 'chalk'

/**
 * 目录切换
 * @param args
 */
export default function (args: ParsedArgs) {
  const target = args._[0]
  if (target && isExist(target)) {
    process.chdir(target)
  } else return console.log(chalk.red('该目录下找不到目标文件或文件夹'))
}
