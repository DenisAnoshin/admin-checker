import { createApp } from 'vue'
import './assets/style/body.css'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import HeaderMenu from './components/HeaderMenu.vue'


const app = createApp(App)  

app.use(VueCookies)
app.use(router)

app.component('HeaderMenu', HeaderMenu)

app.mount('#app')