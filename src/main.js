// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import * as mqtt from 'https://unpkg.com/mqtt/dist/mqtt.min.js'

import router from './router'

// Vue.use(VueRouter)


createApp(App)
  .use(router)
  .use(mqtt)
  .mount('#app')
