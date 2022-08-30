import { ParsedArgs } from 'minimist'
import ora, { Ora } from 'ora'
import { getFilename, getFileExtName } from '../utils/files'
import fs from 'fs'
import axios from 'axios'
import { finished } from 'stream/promises'
import chalk from 'chalk'

interface IWgetArgs extends ParsedArgs {
  o?: string | boolean
}

const log = console.log

/**
 * 获取文件保存名称
 * @param url 文件地址
 * @param outputName 文件输出名称
 */
function getFileSaveName(
  url: string,
  outputName: string,
  headerFileName: string
) {
  // 根据下载地址获取文件名
  const name = headerFileName
    ? headerFileName.split(';')[1].split('=')[1].replaceAll(/['"]/g, '')
    : getFilename(url).split('?')[0]
  const extName = getFileExtName(url).split('?')[0]
  // 根据是否指定o获取文件保存名
  const fileSaveName = outputName ? outputName + extName : name

  return fileSaveName
}

/**
 * 获取下载速度（Mb）
 * @param timeLogger: 记录时间
 * @param chunkLogger: 记录加载量
 * @param timeLogger: 计算的间隔时间（毫秒）
 */
function getDownloadSpeed(
  timeLogger: { lastTime: number; currTime: number },
  chunkLogger: { lastLoaded: number; currentLoaded: number },
  time: number
) {
  let speed = '0.00'
  let timeDelta = 0
  let size = 0
  timeLogger.currTime = Date.now()
  if (timeLogger.currTime - timeLogger.lastTime > time) {
    timeDelta = timeLogger.currTime - timeLogger.lastTime
    size = chunkLogger.currentLoaded - chunkLogger.lastLoaded
    speed = ((size * 1000) / (timeDelta * 1024 * 1024)).toFixed(2)
    // 更新last
    timeLogger.lastTime = timeLogger.currTime
    chunkLogger.lastLoaded = chunkLogger.currentLoaded
    return speed
  } else return ''
}

/**
 * 从远端获取文件并保存
 * @param url 文件地址
 * @param fileSaveName 文件保存名称
 * @param spinner 指示器
 */
async function saveFile(
  data: any,
  fileSize: number,
  fileSaveName: string,
  spinner: Ora
) {
  // 获取下载文件的大小
  const size = fileSize
  // 创建一个文件写入流
  const stream = fs.createWriteStream(fileSaveName)
  // 记录已经下载的数据长度
  let loaded = 0
  // 记录速度
  let speed = '0.00'
  // 记录时间
  const timeLogger = {
    lastTime: 0,
    currTime: 0,
  }
  // 记录加载量
  const chunkLogger = {
    lastLoaded: 0,
    currentLoaded: 0,
  }
  // 是否开启速度计算
  let isStartSpeedCalc = false
  // 将响应数据流通过pipe管道连接到文件写入流
  data.pipe(stream)
  // 监听响应流的data事件，chunk是本次读取的buffer数据
  data.on('data', (chunk: Buffer) => {
    // loaded累加到达的数据长度
    loaded += chunk.byteLength
    chunkLogger.currentLoaded = loaded
    if (isStartSpeedCalc) {
      speed = getDownloadSpeed(timeLogger, chunkLogger, 1000) || speed
    } else {
      timeLogger.lastTime = Date.now()
    }
    isStartSpeedCalc = true
    // 计算完成的百分比
    const percent = ((loaded / size) * 100).toFixed(1)
    spinner.text = `${percent}%  ${chalk.dim(`${speed} Mb/s`)} \n`
  })
  // 等待写入流的结束，即下载完成
  await finished(stream)
}

/**
 * 文件下载
 * @param args 命令行参数
 */
export default async function wget(args: IWgetArgs) {
  try {
    const { _, ...restArgs } = args
    const { o: outputName = '' } = restArgs
    const arg = _[0]
    if (arg === undefined)
      return log(
        chalk.red(
          `need url arg, please input ${chalk.bold(
            'wget help'
          )} for more information`
        )
      )
    // 若传参却没传值则为true
    if (outputName === true)
      return log(
        chalk.red(
          `need a name for file, please input ${chalk.bold(
            'wget help'
          )} for more information`
        )
      )
    const { headers, data } = await axios.get(arg, {
      responseType: 'stream', // 流形式返回
    })

    // 获取文件保存名
    const fileSaveName = getFileSaveName(
      arg,
      outputName as string,
      headers['content-disposition']
    )

    // 创建一个加载指示器
    const spinner = ora('')
    // 指示器的颜色
    spinner.color = 'green'

    // 下载提示
    log()
    log(`${chalk.bgBlue('downloading')} ${fileSaveName}...`)

    //  开启指示器
    spinner.start()
    // 保存文件
    await saveFile(
      data,
      Number(headers['content-length']),
      fileSaveName,
      spinner
    )
    // 修改指示器的状态
    spinner.stopAndPersist({
      symbol: chalk.green('√'),
    })
  } catch (error) {
    log(chalk.red(`cannot connect url, please retry`))
  }
}
