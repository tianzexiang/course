export function getURLSearchParams(params: Record<string, string>) {
  const query = new URLSearchParams(params)
  return '?' + query.toString()
}
