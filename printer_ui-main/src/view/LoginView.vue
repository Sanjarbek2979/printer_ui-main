<template>
  <div id="login">
    <el-row :gutter="24">
      <el-col :span="6">
        <h1>Tizimga kirish</h1>

        <el-form label-width="100px" v-if="!isRegister">
          <el-input placeholder="username" v-model="loginDTO.username"></el-input>
          <el-input placeholder="password" type="password" v-model="loginDTO.password"></el-input>
          <el-input placeholder="Parolni tasdig'ini kirit" v-if="activePassword" type="password"
                    v-model="prePassword"></el-input>
          <el-button plain Warning @click="onFormLogin">Kirish</el-button>
        </el-form>
        <el-form ref="anyName" label-width="100px" v-if="isRegister" v-on:submit.prevent="onFormRegister">
          <el-input placeholder="Fullname" v-model="registerDTO.fullName" aria-required="true"></el-input>
          <el-input placeholder="Username" v-model="registerDTO.username"></el-input>
          <el-input placeholder="Password" v-model="registerDTO.password" type="password"></el-input>
          <el-select v-model="department" placeholder="Select department">
            <el-option
              v-for="item in departments"
              :key="item.id"
              :value="item.name">
              {{ registerDTO.departmentId = item.id }}
            </el-option>
          </el-select>
          <el-button @click="registerForm">Ro'yxatdan o'tish</el-button>
        </el-form>
        <a @click="forgetPassword" id="forgetPassword" href="#">Parolni unutdingizmi?</a>
        <div class="register" v-if="isRegister">
          <p>Men allaqachon ro'yxatdan o'tganman</p>
          <a @click="registerForm" class="register1" href="#">Kirish</a>
        </div>
        <div class="register" v-if="!isRegister">
          <p>Yangi foydalanuvchimisiz?</p>
          <a @click="registerForm" class="register1" href="#">Ro'yhatdan o'tish</a>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="img">
          <img src="../assets/sign.svg" width="90%">
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ElementUI from 'element-ui'
import Vue from 'vue'
import axios from 'axios'
import {mapActions} from 'vuex'

// import store from "@/store";
// import store from "@/store";
// import router from "@/router";

Vue.use(ElementUI)
export default {
  data() {
    return {
      registerDTO: {
        fullName: '',
        departmentId: 0,
        username: '',
        password: ''
      },
      activePassword: false,
      isRegister: false,
      department: null,
      departments: [],
      loginDTO: {
        username: '',
        password: ''
      },
      prePassword: '',
      message: '',
      currentUser: '',
      username: ''
    }
  },

  methods: {
    open1() {
      this.$notify({
        message: 'Inputs shouldn`t be empty',
        type: 'warning'
      });
    },
    open3() {
      this.$notify({
        message: 'Something went wrong',
        type: 'warning'
      });
    },
    open4() {
      this.$notify({
        message: 'Username or password went wrong',
        type: 'error'
      });
    },
    open2() {
      this.$notify({
        message: 'Successfully registered',
        type: 'success'
      });
    },
    open5(message) {
      this.$notify({
        message: message,
        type: 'error'
      });
    },
    forgetPassword: function () {
      this.activePassword = !this.activePassword
    },
    async registerForm() {
      this.isRegister = !this.isRegister
      await axios.get('/department').then(value => {
        this.departments = value.data.object
      })
    },

    ...mapActions({
      logIn: 'auth/logIn',
    }),
    async onFormLogin() {
      if (this.loginDTO.password === '' || this.loginDTO.username === '') {
        this.open1()
      } else {
        await this.logIn(this.loginDTO)
        // await this.RoleBased()
       // let currentUser=JSON.parse(localStorage.getItem('currentUser'))
       //  console.log(currentUser)
       //    if (currentUser.role.name === 'USER') {
       //      await this.$router.push('/user')
       //    } else if (currentUser.role.name === 'ADMIN') {
       //      await this.$router.push('/admin')
       //    }
        //
        // }).catch(
        //   err => {
        //     this.open4()
        //     this.loginDTO.password = ''
        //     this.loginDTO.username = ''
        //     console.log(err)
        //
        //   }
        // )
      }
    },
    onFormRegister() {
      this.registerForm()
      if (this.registerDTO.password === '' || this.registerDTO.fullName === '' || this.registerDTO.username === '' || this.registerDTO.departmentId === 0) {
        this.open3()
        this.isRegister = !this.isRegister
      }
      axios.post('/user/register', this.registerDTO).then(response => {
        console.log(response)
        this.open2()
      }).catch(
        err => {
          if (err.response.data.success === false) {
            this.open5(err.response.data.message)
            this.isRegister = !this.isRegister
            this.department = null
          } else {
            this.$router.push('/')
          }
        }
      ),

        this.registerDTO.fullName = ''
      this.registerDTO.username = ''
      this.registerDTO.password = ''
    }
  },
  name: 'LoginView'
}
</script>

<style scoped>

#login {
  position: relative;
}

.el-row {
  padding-top: 250px;
  padding-left: 300px;
}

.el-col-6 {
  text-align: center;
  padding-top: 30px;
  /*position: absolute;*/
  padding-left: 0px !important;
  padding-right: 0px !important;
  top: 200px;
  left: 200px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  /*background: #2c3e50;*/
}

.el-col-12 {
  position: absolute;
  top: 90px;
  right: 10%;
}

.el-button {
  width: 80%;
  margin-bottom: 10px;
  background: #00b533;
  color: #fff;
  font-size: 18px;
}

.el-input {
  /*border-bottom: 1px solid black;*/
  margin-bottom: 25px;
  width: 80%;
}

.el-select {
  width: 80%;
  margin-bottom: 25px;
}

#forgetPassword {
  text-decoration: none;
  color: #898989;
  font-size: 14px;
}

p {
  color: #898989;
  font-size: 14px;
}

.register {
  background: #f8f8f8;
  padding: 20px;
  margin-top: 20px;
}

.register1 {
  text-decoration: none;
  color: #00b533;
  font-weight: bold;
  font-size: 18px;
}

.img {
  text-align: right;
}

</style>
