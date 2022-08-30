import { setStyle, IStyle } from './styles'

export interface IColInfo {
  title: string
  rawKey: string
  width: number
}

export interface ITableData extends IStyle {
  value: string
}

export interface IPrintTableOptions {
  titleIndent?: number
  titleAlign?: 'left' | 'center' | 'right'
  titleStyle?: IStyle // 设置title,
  showTopBottomDivider?: boolean // 是否显示上下边框 默认false
  tableDividerSeparator?: string // divider分隔符 默认 '-'
  titleIndentSeparator?: string // indent 分隔符 默认 ' '
  footer?: boolean // 是否开启footer
}

export type TTableData<T> = {
  [key in keyof T]: ITableData
}

const log = console.log

// 获取每列应有的信息
function getColInfo<T>(
  tableTitle: string[],
  tableData: TTableData<T>[]
): IColInfo[] {
  // 记录每一列所占宽度
  const colInfo: IColInfo[] = []
  // 获取tableData keys
  const tableDataKeys = Object.getOwnPropertyNames(tableData[0])
  for (const i in tableTitle) {
    const titleLen = tableTitle[i].length
    // 行数据传换成列数据求每列最大宽度
    const colData = tableData.map((data) => data[tableDataKeys[i]])
    const maxDataLen = Math.max(...colData.map((data) => data.value.length))
    const maxLen = titleLen > maxDataLen ? titleLen : maxDataLen
    colInfo.push({
      title: tableTitle[i],
      rawKey: tableDataKeys[i],
      width: maxLen,
    })
  }
  return colInfo
}

// 画出表格
function render<T>(
  colInfo: IColInfo[],
  tableData: TTableData<T>[],
  options?: IPrintTableOptions
) {
  // 获取表格选项
  const {
    titleIndent = 4,
    titleAlign = 'left',
    titleStyle = { bgColor: 'bgBlue', font: 'bold' },
    showTopBottomDivider = false,
    tableDividerSeparator = '-',
    titleIndentSeparator = ' ',
    footer = false,
  } = options
  // 获取表格总宽度
  const tableTotalWidth =
    colInfo.reduce(
      (pre, curr) => {
        return {
          title: '',
          rawKey: '',
          width: pre.width + curr.width,
        }
      },
      { width: 0, title: '', rawKey: '' }
    ).width +
    titleIndent * (colInfo.length - 1)
  // 最终应有的table header
  let tableHeader: string = ''
  // 最终应有的分隔线
  let divider: string = ''
  // 最终应有的数据展示
  let tableDataView: string = ''

  // 画出tableHeader、divider
  colInfo.forEach((col, idx) => {
    // 是否有indent
    const separator =
      idx === colInfo.length - 1 ? '' : titleIndentSeparator.repeat(titleIndent)
    // 左对齐或右对齐
    if (titleAlign === 'left' || titleAlign === 'right') {
      // 决定调用方法
      const renderWay = titleAlign === 'left' ? 'padEnd' : 'padStart'
      tableHeader +=
        setStyle(col.title[renderWay](col.width), titleStyle) + separator
      divider +=
        tableDividerSeparator[renderWay](col.width, tableDividerSeparator) +
        separator
    } else if (titleAlign === 'center') {
      const title =
        ' '.repeat(Math.floor((col.width - col.title.length) / 2)) +
        col.title +
        ' '.repeat(Math.ceil((col.width - col.title.length) / 2))
      tableHeader += setStyle(title, titleStyle) + separator
      divider +=
        tableDividerSeparator.padEnd(col.width, tableDividerSeparator) +
        separator
    }
  })

  // 画出tableDataView
  tableData.forEach((data, dataIdx) => {
    colInfo.forEach((col, colIdx) => {
      const { value, ...dataStyle } = data[col.rawKey]
      // 是否有indent以及是否换行
      const separator =
        colIdx === colInfo.length - 1
          ? dataIdx === tableData.length - 1
            ? ''
            : '\n'
          : ' '.repeat(titleIndent)
      // 是否开启footer
      const footerDivider =
        footer &&
        dataIdx === tableData.length - 2 &&
        colIdx === colInfo.length - 1
          ? tableDividerSeparator.repeat(tableTotalWidth) + '\n'
          : ''

      tableDataView +=
        setStyle(value.padEnd(col.width), dataStyle) + separator + footerDivider
    })
  })

  // 是否展示table divider
  const topBottomDivider = showTopBottomDivider
    ? tableDividerSeparator.repeat(tableTotalWidth)
    : ''
  const lineBreak = showTopBottomDivider ? '\n' : ''
  const renderTemplate = `${
    topBottomDivider + lineBreak
  }${tableHeader}\n${divider}\n${tableDataView}${lineBreak + topBottomDivider}`
  log(renderTemplate)
}

// 主函数
export function printTable<T>(
  tableData: TTableData<T>[],
  tableTitle: string[] = [],
  options: IPrintTableOptions = {}
) {
  const rawKeys = Object.getOwnPropertyNames(tableData[0] || {})
  // 如果有tableTitle
  if (tableTitle.length && rawKeys.length !== tableTitle.length)
    return new Error('标题与属性个数不匹配')
  // 如果没有tableTitle根据tableData Key 自动生成
  const _tableTitle: string[] = tableTitle.length === 0 ? rawKeys : tableTitle

  const colInfo = getColInfo<T>(_tableTitle, tableData)
  render<T>(colInfo, tableData, options)
}
