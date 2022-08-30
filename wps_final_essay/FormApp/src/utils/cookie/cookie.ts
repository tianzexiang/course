export function isCookieExist (param: string) {
  const cookies: string[] = document.cookie.split('; ')
  for (const str of cookies) {
    if (str.includes(param)) {
      const [, value] = str.split('=')
      if (value.length > 0) return true
    }
  }
  return false
}
