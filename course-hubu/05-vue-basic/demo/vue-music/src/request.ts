// 定义一个基本的异步网络请求方法
async function request<T>(method: string, url: string) {
  const res = await fetch(url, {
    method,
  });
  const json: T = await res.json();
  return json;
}

// 导出一个简单的GET请求方法
export function get<T>(url: string): Promise<T> {
  return request<T>("GET", url);
}
