import * as readline from 'readline'
import minimist from 'minimist'
import chalk from 'chalk'
import cd from './libs/cd'
import find from './libs/find'
import cls from './libs/cls'
import exit from './libs/exit'
import ls from './libs/ls'
import cloc from './libs/cloc'
import wget from './libs/wget'
import { isPassedArgCorrect, help as handleHelp } from './utils/command'

const commands = {
  cd,
  find,
  cls,
  exit,
  ls,
  cloc,
  wget,
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function run() {
  rl.question(
    chalk.cyan('NodeShell') + ' ' + process.cwd() + '> ',
    async (answer) => {
      try {
        const arr = answer
          .split(' ')
          .map((item) => item.trim())
          .filter((item) => item !== '')
        const cmd = arr[0]
        const help = arr[1]
        const args = minimist(arr.slice(1))
        const { _, ...restArgs } = args
        // 通过命令行参数检验
        if (isPassedArgCorrect(cmd, restArgs)) {
          // 如果是command指令
          if (cmd === 'command') {
            if (help === 'help') {
              handleHelp(cmd)
            } else {
              console.log(
                chalk.red(`please input ${chalk.bold('command help')}`)
              )
            }
          } else {
            if (help === 'help') {
              handleHelp(cmd)
            } else await commands[cmd](args)
          }
        }
      } catch (error) {
        console.trace(error)
      }
      run()
    }
  )
}

cls()
run()
