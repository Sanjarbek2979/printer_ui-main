import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from "./router";
import 'element-ui/lib/theme-chalk/index.css'
import './axios'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)




new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
