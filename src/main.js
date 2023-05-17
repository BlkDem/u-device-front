// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import * as mqtt from 'https://unpkg.com/mqtt/dist/mqtt.min.js'

createApp(App)
  .use(mqtt)
  .mount('#app')
