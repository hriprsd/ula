import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router' // Import the router


Vue.config.productionTip = false

new Vue({
  vuetify,
  router, // Add the router to the Vue instance
  render: h => h(App)
}).$mount('#app')
