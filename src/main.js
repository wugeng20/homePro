import '@/assets/css/style.less';
import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";

const app = createApp(App); // 全局组件

app.use(router)
app.mount('#app')
