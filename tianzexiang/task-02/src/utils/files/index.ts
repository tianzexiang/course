import fs from 'fs'
import path from 'path'

function getMtime(target: string) {
  return Date.parse(fs.statSync(target).mtime.toString())
}

function getDirname(dir: string) {
  return dir.split('\\').pop()
}

function getFilename(file: string) {
  return path.basename(file)
}

function getFileSize(file: string) {
  return fs.statSync(file).size
}

function getFileExtName(file: string) {
  return path.extname(file)
}

function isDir(file: string) {
  return fs.statSync(file).isDirectory()
}

function isExist(file:string): boolean {
  const abPath = path.join(process.cwd(), file)
  if (fs.existsSync(abPath)) return true
  else return false
}

export {
  getMtime,
  getDirname,
  getFilename,
  getFileSize,
  getFileExtName,
  isDir,
  isExist
}