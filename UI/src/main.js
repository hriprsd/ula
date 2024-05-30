import Vue from 'vue'
import App from './App.vue'
import store from './store' // Import the store
import vuetify from './plugins/vuetify'
import router from './router' // Import the router


Vue.config.productionTip = false

new Vue({
  vuetify,
  store, // Add the store to the Vue instance
  router, // Add the router to the Vue instance
  render: h => h(App)
}).$mount('#app')
