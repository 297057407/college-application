import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
//组件中文化
import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'
//pinia持久化存储
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//自定义指令
import { directivePlugin } from '@/directives/directivePlugin'
const pinia = createPinia()
const app = createApp(App)
pinia.use(piniaPluginPersistedstate)
app.use(ElementPlus, { locale })
app.use(pinia)
app.use(router)
app.use(directivePlugin)
app.mount('#app')
