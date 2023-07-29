import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
//组件中文化
import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { directivePlugin } from '@/directives/directivePlugin'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)



const app = createApp(App)
app.use(ElementPlus,{locale})

app.use(pinia)
app.use(router)
app.use(directivePlugin)
app.mount('#app')
