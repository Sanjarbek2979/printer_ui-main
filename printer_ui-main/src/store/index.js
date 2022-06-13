import Vue from "vue";
import Vuex from "vuex"
import auth from "./modules/auth/auth"
import admin from "./modules/admin/admin"
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token:auth.getters.GET_TOKEN
  },
  getters: {

  },
  actions: {

  },
  mutations: {
  },
  modules: {
    auth,
    admin
  }
})
