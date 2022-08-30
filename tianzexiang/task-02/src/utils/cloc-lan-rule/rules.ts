import { execCommentRule, handleClocCommentRule } from './index'

export interface ICommentRule {
  single: RegExp
  multiple: RegExp
}

export interface IClocLanRule {
  lan: string
  test: RegExp
  use: {
    comment: ICommentRule | ((fileString: string) => string[]) // 处理过后不含空行的fileString
  }
}

// js
const ClocJavaScriptRule: IClocLanRule = {
  lan: 'JavaScript',
  test: /\.(js|jsx|mjs|cjs)$/,
  use: {
    comment: {
      single: /^\s*\/\/.*/gm,
      multiple: /\/\*[^]*?\*\//g,
    },
  },
}

// ts
const ClocTypeScriptRule: IClocLanRule = {
  lan: 'TypeScript',
  test: /\.(ts|tsx)$/,
  use: {
    comment: {
      single: /^\s*\/\/.*/gm,
      multiple: /\/\*[^]*?\*\//g,
    },
  },
}


// css
const ClocCssRule: IClocLanRule = {
  lan: 'CSS',
  test: /\.css$/,
  use: {
    comment: {
      single: /^\s*\/\/.*/gm,
      multiple: /\/\*[^]*?\*\//g,
    },
  },
}

// scss
const ClocScssRule: IClocLanRule = {
  lan: 'SCSS',
  test: /\.scss$/,
  use: {
    comment: {
      single: /^\s*\/\/.*/gm,
      multiple: /\/\*[^]*?\*\//g,
    },
  },
}

// json
const ClocJSONRule: IClocLanRule = {
  lan: 'JSON',
  test: /\.json$/,
  use: {
    comment: {
      single: /[]/,
      multiple: /[]/,
    },
  },
}


// html
function execHtmlCommentRule(fileString: string): string[] {
  // html中注释正则
  const htmlCommentRegex: ICommentRule = {
    single: /[]/,
    multiple: /<!--[^]*?-->/g,
  }
  // 取出内联style和script正则
  const styleRegex = /<style[^>]*>[^]*?<\/[^>]*style>/g
  const scriptRegex = /<script[^>]*>[^]*?<\/[^>]*script>/g

  // style content
  const styleContent = fileString.match(styleRegex)
    ? fileString.match(styleRegex).join('')
    : ''
  // script content
  const scriptContent = fileString.match(scriptRegex)
    ? fileString.match(scriptRegex).join('')
    : ''
  // html content
  const htmlContent = fileString.replaceAll(styleContent + scriptContent, '')

  // 分别求所有comment
  // html comment
  const htmlComment = handleClocCommentRule(htmlContent, htmlCommentRegex)
  // script comment
  const scriptComment = execCommentRule(scriptContent, ClocJavaScriptRule)
  // style comment
  const styleComment = execCommentRule(styleContent, ClocCssRule)

  return htmlComment.concat(styleComment).concat(scriptComment)
}
const ClocHtmlRule: IClocLanRule = {
  lan: 'HTML',
  test: /\.(html|htm)$/,
  use: {
    comment: execHtmlCommentRule,
  },
}

// total
export const ClocLanRuleList: IClocLanRule[] = [
  ClocJavaScriptRule,
  ClocTypeScriptRule,
  ClocJSONRule,
  ClocCssRule,
  ClocHtmlRule,
  ClocScssRule,
]
