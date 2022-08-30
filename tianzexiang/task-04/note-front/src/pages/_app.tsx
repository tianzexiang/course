import { Result } from 'antd-mobile'
import type { AppProps } from 'next/app'
import '../styles/normalize.scss'
import { Toast } from 'antd-mobile'
import { useRouter } from 'next/router'
import 'react-quill/dist/quill.snow.css' // react-quill

// 配置toast
Toast.config({
  duration: 500,
})

function MyApp({ Component, pageProps }: AppProps) {
  if (pageProps.msg) {
    return (
      <Result status="error" title="无法完成操作" description={pageProps.msg} />
    )
  }
  const router = useRouter()
  return <Component {...pageProps} key={router.asPath} />
}

export default MyApp
