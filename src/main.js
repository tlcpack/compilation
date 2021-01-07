  
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueDirectiveMarkdown from 'vue-directive-markdown'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "@/plugins/echarts"

Vue.use(BootstrapVue)
Vue.directive('decode', VueDirectiveMarkdown)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
