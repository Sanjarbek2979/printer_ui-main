import axios from "axios";
import router from "@/router";

export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, user) {
      state.user = user
    },
    LOG_OUT(state){
      state.token = null
        state.user = null
    }
  },
  actions: {
    async logIn({dispatch, commit}, credentials) {
      let response = await axios.post('/auth/login', credentials)
      localStorage.setItem('jwt', response.data)
      commit('SET_TOKEN', response.data)
      dispatch('attempt', response.data)
      console.log(response.data)
    },

    async attempt({ dispatch }, token) {

      try {
        let response = await axios.get('/auth/me', {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        dispatch('tokenBased', response.data)
      } catch (e) {
        console.log('failed')
      }
    },
    async tokenBased({commit, dispatch}, response) {

      commit('SET_USER', response)
      localStorage.setItem('username', response.username)
      localStorage.setItem('currentUser', JSON.stringify(response))
      dispatch('roleBased', response.data)
    },
    async roleBased(currentUser) {
      if (currentUser.state.user.role.name === 'ADMIN') {
        await router.push('/admin')
      } else if (currentUser.state.user.role.name === 'USER') {
        await router.push('/user')
      } else {
        await router.push('/')
      }
    },

    async logOut({ commit }){
      commit('LOG_OUT')
    }
  }, getters: {
    GET_TOKEN(state) {
      return state.token;
    }
  }
}
