import * as request from './request.js'
import { IArea, IAlbum, Area, Album } from './types.js'

// 当前选中area的id
let currentArea: number
let areas: Area[] = []
let albums: Album[] = []


// 删除图片 路径
const deleteImgSrc: string = './images/delete.png'


// 加载数据
async function loadData() {
  let [_areas, _albums] = await Promise.all([
    request.get<IArea[]>('./data/areas.json'),
    request.get<IAlbum[]>('./data/albums.json')
  ])
  areas = _areas.map(obj => new Area(obj))
  albums = _albums.map(obj => new Album(obj))
  currentArea = areas[0].id
}

// 切换tab
function changeTab(id: number) {
  // 当前tab，不执行操作
  if (id === currentArea) return
  const deactivedArea = currentArea
  currentArea = id
  // 删除未选中tab active类名
  for (let area of areas) {
    if (area.id === deactivedArea) {
      area.el?.classList.remove('active')
      break
    } else continue
  }

  // 添加选中tab active类名
  for (let area of areas) {
    if (area.id === currentArea) {
      area.el?.classList.add('active')
      break
    } else continue
  }

  // 刷新列表
  createList()
}

// 创建元素并添加class
function createEl(elName: string, className?: string) {
  const el = document.createElement(elName)
  if (className) el.className = className
  return el
}


// 创建Area模板
function createAreaTemplate(area: Area) {

  // 创建模板，添加事件
  let item = createEl('li', 'item')
  item.addEventListener('click', () => changeTab(area.id))
  item.innerText = area.name
  // 关联数据对象和DOM节点
  area.el = item
}

// 创建 area tabs
function createTabs() {
  let tabs = document.querySelector('.area-list')
  let fragment = document.createDocumentFragment()
  for (let area of areas) {
    createAreaTemplate(area)
    if (area.el) fragment.appendChild(area.el)
  }
  areas[0].el?.classList.add('active')
  tabs?.appendChild(fragment)
}

// 删除album
function deleteAlbum(album: Album) {
  album.el = null
  albums = albums.filter(item => !Object.is(item, album))
  createList()
}


// 创建Album模板
function createAlbumTemplate(album: Album) {

  // 创建模板，添加事件
  let item = createEl('div', 'item')
  let coverWrap = createEl('div', 'cover-wrap')
  let content = createEl('div', 'content')
  item.appendChild(coverWrap)
  item.appendChild(content)
  let coverImg = createEl('img', 'cover-img') as HTMLImageElement
  coverImg.src = album.cover
  let coverMask = createEl('div', 'cover-mask')
  let coverDelete = createEl('img', 'cover-delete') as HTMLImageElement
  coverDelete.src = deleteImgSrc
  coverWrap.appendChild(coverImg)
  coverWrap.appendChild(coverMask)
  coverWrap.appendChild(coverDelete)
  let name = createEl('div', 'name')
  name.innerText = album.name
  let singer = createEl('div', 'singer')
  singer.innerText = album.singer
  let releaseTime = createEl('div', 'release-time')
  releaseTime.innerText = album.release_time
  content.appendChild(name)
  content.appendChild(singer)
  content.appendChild(releaseTime)

  coverDelete.addEventListener('click', () => deleteAlbum(album))
  // 关联数据对象和DOM节点
  album.el = item
}

// 创建 album list
function createList() {
  let list = document.querySelector('.album-list')
  let rows = albums.filter(item => item.area === currentArea)
  let fragment = document.createDocumentFragment()
  
  for (let row of rows) {
    if (row.el === null) {
      createAlbumTemplate(row)
    }
    if (row.el) fragment.appendChild(row.el)
  }
  // 清空列表内容
  if(list) list.innerHTML = ''
  
  // 添加fragment
  list?.appendChild(fragment)
  
}

// 构建
async function bootStrap() {
  // 等待数据
  await loadData()
  //  创建标签
  createTabs()
  //  创建列表
  createList()
}

bootStrap()