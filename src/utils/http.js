import axios from 'axios'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
// 创建axios实例
const http = axios.create({
  baseURL: 'https://p7571184p7.zicp.fun',
  timeout: 50000
})

// axios请求拦截器
http.interceptors.request.use(config => {
  return config
}, e => {
  ElMessage.error('出错啦，请稍后再试')
  Promise.reject(e)
})

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
  ElMessage.error('出错啦，请稍后再试')
  return Promise.reject(e)
})


export default http