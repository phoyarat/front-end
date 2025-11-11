import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// import ส่วนของ Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// สร้าง instance ของ Vuetify
const vuetify = createVuetify({
  components,
  directives,
})

// ผูก Vuetify กับแอปหลัก
const app = createApp(App)
app.use(vuetify)
app.mount('#app')
