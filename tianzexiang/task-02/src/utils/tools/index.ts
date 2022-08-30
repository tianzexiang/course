interface ISortOptions {
  order?: 'desc' | 'asc'
}

// 初始化对照器设置
const collator = new Intl.Collator(undefined, {numeric: true})

function sort<T>(
  targetArr: T[],
  targetKey: string,
  options: ISortOptions = {}
) {
  const { order = 'asc' } = options
  // 如果数组为空
  if (!targetArr.length) return targetArr
  if (!targetArr[0][targetKey]) return new Error('找不到对应属性')
  if (order === 'asc') {
    targetArr.sort((a: T, b: T) => {
      const compareRes = collator.compare(String(a[targetKey]), String(b[targetKey]))
      if (compareRes === -1) return -1
      else if (compareRes === 1) return 1
      else return 0
    })
  } else if (order === 'desc') {
    targetArr.sort((a: T, b: T) => {
      const compareRes = collator.compare(String(a[targetKey]), String(b[targetKey]))
      if (compareRes === -1) return 1
      else if (compareRes === 1) return -1
      else return 0
    })
  }
}


// 以某源数组为主，判断目标数组是否全部包含其中 -1 全包含 ，出错返回第一个出错下标
function isArrayContain(
  source: (string | number)[],
  target: (string | number)[]
): number {
  // 记录错误的ArgKey
  let errKeyIdx = -1
  // 判断是否全部包含
  target.every((val, idx) => {
    const included = source.includes(val)
    errKeyIdx = included ? errKeyIdx : idx
    return included
  })
  return errKeyIdx
}



export {
  sort,
  isArrayContain
}