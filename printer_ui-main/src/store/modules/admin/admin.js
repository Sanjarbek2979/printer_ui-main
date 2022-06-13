import axios from "axios";
// import router from "@/router";
import auth from "@/store/modules/auth/auth";

export default {
  namespaced: true,
  state: {

  },
  mutations: {

  },
  actions: {
    async changePassword (changePasswordDto) {
    let response = await axios.post('/user/change/password',changePasswordDto,{
      headers: {
        'Authorization': 'Bearer ' + auth.state.token
      }
    })
      console.log(response)
    }
  },
  getters: {

  }
}
