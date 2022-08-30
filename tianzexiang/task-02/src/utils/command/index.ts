import chalk from 'chalk'
import { isArrayContain } from '../tools/index'
import { help } from './help'

const totalCommandInfo: Record<string, string[] | Record<string, string[]>> = {
  command: [],
  cd: [],
  find: [],
  cls: [],
  exit: [],
  ls: {
    sort: ['mtime', 'name'],
    order: ['desc', 'asc'],
  },
  wget: ['o'],
  cloc: {
    sort: ['files', 'blank', 'code', 'comment'],
    order: ['desc', 'asc'],
  },
}

function isPassedArgCorrect(
  command: string,
  targetArgs: Record<string, string>
): boolean {
  // 所有命令名称
  const specifiedCommandKeys = Object.getOwnPropertyNames(totalCommandInfo)
  // 所有传参名称
  const targetArgKeys = Object.getOwnPropertyNames(targetArgs)

  // 如果包含
  if (specifiedCommandKeys.includes(command)) {
    // 如果该指令没有进一步指令参数
    if (Array.isArray(totalCommandInfo[command])) {
      if (!totalCommandInfo[command].length) return true
      else {
        const isIncludedIdx = isArrayContain(
          totalCommandInfo[command] as string[],
          targetArgKeys
        )
        if (isIncludedIdx === -1) return true
        else {
          console.log(
            chalk.red(
              `passed arg key ${chalk.bold(
                targetArgKeys[isIncludedIdx]
              )} not found, please input ${chalk.bold(
                `${command} help`
              )} for more information`
            )
          )
          return false
        }
      }
    } else {
      // 如果有继续判断
      const specifiedArgKeys = Object.getOwnPropertyNames(
        totalCommandInfo[command]
      )
      // 没有传参
      if (!targetArgKeys.length) return true
      // 判断是否全部包含
      const isAllTargetArgKeysIdx = isArrayContain(
        specifiedArgKeys,
        targetArgKeys
      )
      // 如果每一个都包含
      if (isAllTargetArgKeysIdx === -1) {
        let isTargetArgValuesCorrect = true
        // 记录错误的key值
        let errKey = ''
        for (const key of targetArgKeys) {
          if (!isTargetArgValuesCorrect) break
          isTargetArgValuesCorrect = (
            totalCommandInfo[command][key] as string[]
          ).includes(targetArgs[key])
          errKey = isTargetArgValuesCorrect ? errKey : key
        }

        if (!isTargetArgValuesCorrect) {
          console.log(
            chalk.red(
              `passed arg value ${chalk.bold(
                targetArgs[errKey]
              )} not found, please input ${chalk.bold(`${command} help`)} for more information`
            )
          )
          return false
        } else return true
      } else {
        console.log(
          chalk.red(
            `passed arg key ${chalk.bold(
              targetArgKeys[isAllTargetArgKeysIdx]
            )} not found, please input ${chalk.bold(
              `${command} help`
            )} for more information`
          )
        )
        return false
      }
    }
  } else {
    console.log(
      chalk.red(
        `command ${chalk.bold(command)} not found, please input ${chalk.bold(
          'command help'
        )} for more information`
      )
    )
    return false
  }
}

export { help, isPassedArgCorrect }
