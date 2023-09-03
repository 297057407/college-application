import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueLazyload from 'vue3-lazyload';
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
//图片懒加载
app.use(VueLazyload, {
    // 配置选项
    // preLoad: 1.3, // 图片的预加载高度比例
    error: '@/assets/images/IMG404.gif', // 图片加载失败时显示的图片
    // loading: '@/assets/images/loading.gif', // 图片加载中显示的图片
    attempt: 2, // 尝试加载图片的次数
});
app.use(pinia)
app.use(router)
app.use(directivePlugin)
app.mount('#app')
