import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import App from './App'
import { Toast } from 'antd-mobile'
// 配置toast
Toast.config({
  duration: 1000
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(<App />)
