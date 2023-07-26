import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


//组件中文化
import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'


const app = createApp(App)
app.use(ElementPlus,{locale})

app.use(createPinia())
app.use(router)

app.mount('#app')