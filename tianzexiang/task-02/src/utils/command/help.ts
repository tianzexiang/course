import chalk from 'chalk'
import { printTable, TTableData } from '../table/index'

export interface ICommandDesc {
  command: string
  desc: string
  args?: ICommandArg[]
}

export interface ICommandArg {
  arg: string
  argValue: string[]
}

export const totalCommandDesc: ICommandDesc[] = [
  {
    command: 'command',
    desc: '',
    args: [
      {
        arg: 'cd',
        argValue: ['switch path'],
      },
      {
        arg: 'find',
        argValue: ['find target file'],
      },
      {
        arg: 'cls',
        argValue: ['clear nodeshell'],
      },
      {
        arg: 'exit',
        argValue: ['exit nodeshell'],
      },
      {
        arg: 'ls',
        argValue: ['list current directory and file'],
      },
      {
        arg: 'cloc',
        argValue: ['count lines of code'],
      },
      {
        arg: 'wget',
        argValue: ['download file'],
      },
    ],
  },
  {
    command: 'ls',
    desc: 'usage: ls [...args]',
    args: [
      {
        arg: 'sort',
        argValue: ['name', 'mtime'],
      },
      {
        arg: 'order',
        argValue: ['asc', 'desc'],
      },
    ],
  },
  {
    command: 'cd',
    desc: 'usage: cd <dir>',
  },
  {
    command: 'find',
    desc: 'usage: find <name>',
  },
  {
    command: 'cls',
    desc: 'usage: cls',
  },
  {
    command: 'exit',
    desc: 'usage: exit',
  },
  {
    command: 'wget',
    desc: 'usage: wget <url> [...args]',
    args: [
      {
        arg: 'o',
        argValue: ['<filename>'],
      },
    ],
  },
  {
    command: 'cloc',
    desc: 'usage: cloc <dir> [...args]',
    args: [
      {
        arg: 'sort',
        argValue: ['files', 'blank', 'comment', 'code'],
      },
      {
        arg: 'order',
        argValue: ['asc', 'desc'],
      },
    ],
  },
]

const log = console.log
export function help(command: string) {
  // 决定应该渲染哪个帮助指令
  const [commandHelp] = totalCommandDesc.filter(
    (val) => val.command === command
  )
  if (commandHelp.command === 'command') {
    const tableData = commandHelp.args.map<TTableData<ICommandArg>>((val) => ({
      arg: {
        value: val.arg,
      },
      argValue: {
        value: val.argValue.join(', '),
      },
    }))
    log()
    printTable(tableData, ['nodeshell command', 'desc'], {
      titleAlign: 'center',
      showTopBottomDivider: true,
    })
    log()
  } else {
    if (commandHelp.args) {
      const tableData = commandHelp.args.map<TTableData<ICommandArg>>(
        (val) => ({
          arg: {
            value: val.arg,
          },
          argValue: {
            value: val.argValue.join(', '),
          },
        })
      )
      log()
      log(chalk.blue(commandHelp.desc))
      printTable(tableData, ['command args', 'arg value'], {
        titleAlign: 'center',
        showTopBottomDivider: true,
      })
      log()
    } else {
      log()
      log(chalk.blue(commandHelp.desc))
      log()
    }
  }
}
