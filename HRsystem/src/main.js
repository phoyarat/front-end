// import { createApp } from 'vue'
// import App from './App.vue'
// import './style.css'
// import router from './Router'


// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'


// const vuetify = createVuetify({
//   components,
//   directives,
// })


// const app = createApp(App)
// app.use(vuetify)
// app.mount('#app')
// createApp(App).use(router).mount('#app')


import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import router from './Router/index.js'

const vuetify = createVuetify({ components, directives })

createApp(App)
  .use(vuetify)
  .use(router)
  .mount('#app')