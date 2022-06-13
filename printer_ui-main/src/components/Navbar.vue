<template>
  <el-col :span="21">
    <el-menu class="el-menu-demo">
<!--      <el-menu-item index="1">-->
<!--        <el-input placeholder="Search" v-model="searchingWord">-->
<!--          <el-button slot="append" icon="el-icon-search" @click="searchFunc"></el-button>-->
<!--        </el-input>-->
<!--      </el-menu-item>-->
      <!--      <el-menu-item class="Avatar" index="3">-->

      <!--        <i class="el-icon-user-solid"></i>-->
      <!--        {{ fullName }}-->
      <!--      </el-menu-item>-->
      <el-dropdown trigger="click">
        <el-button>
          <i class="el-icon-user-solid"></i> {{ fullName }}
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><a @click="changePassword">Change password</a></el-dropdown-item>
          <el-dropdown-item><a @click="handleClick">Log out</a></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <el-col :span="4">
      <el-form v-if="!isChange">
        <el-input placeholder="initial password" type="password" v-model="changePasswordDto.initialPassword"></el-input>
        <el-input placeholder="new password" type="password"
                  v-model="changePasswordDto.newPassword"></el-input>
        <el-input placeholder="pre-password" type="password"
                  v-model="prePassword"></el-input>
        <el-button @click="onFormChange">Change password</el-button>
      </el-form>
    </el-col>
  </el-col>
</template>

<script>
import axios from "axios";
// import store from "@/store";
import {mapActions, mapGetters} from "vuex";
// import auth from "@/store/modules/auth/auth";
// import auth from "@/auth";

export default {
  data() {
    return {
      changePasswordDto: {
        initialPassword: '',
        newPassword: '',
        username: localStorage.getItem('username')
      },
      prePassword: '',
      searchingWord: '',
      isChange: true,
      getSearch: null,
      fullName: 'sanjar'
    }
  },
  computed:{
    ...mapGetters(['auth/GET_TOKEN'])
  },
  methods: {
    changePassword() {
      this.isChange = !this.isChange
    },
    open1() {
      this.$notify({
        message: 'password lar mos kelmadi ',
        type: 'error'
      });
    },
  async  onFormChange() {
      this.isChange = !this.isChange
      if (this.prePassword !== this.changePasswordDto.newPassword) {
        this.open1();
        this.isChange = !this.isChange
      }
    await axios.post('/user/change/password', this.changePasswordDto,{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then(response => {

      console.log(response)
    })
  },
    ...mapActions({
      logOut: 'auth/logOut',
    }),
   async handleClick() {
     await this.logOut()
      localStorage.removeItem('jwt');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('username');
      await this.$router.push('/');
    },
    searchFunc() {
      axios
        .get('http://localhost:8088/api/department/search?searchingWord=' + this.searchingWord)``
        .then(response => {
          this.getSearch = response.data.object
          console.log(this.departments)
        })
    }

  },
  name: 'AdminView'
}
</script>

<style scoped>
.el-col-21 {
  position: relative;
}

.el-col-4 {
  width: 15%;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  right: 10px;
  top: 6vh;
  z-index: 100;
}

.el-col-4 .el-input {
  margin: 5px 5px;
  width: 80%;
  padding: 2px;
}

.el-col-4 .el-button {
  width: 80%;
}

.el-avatar {
  border-radius: 50%;
}

.el-icon-user-solid {
  margin-right: 10px;
}

.el-button {
  border: 1px solid #fff;
  margin: 10px;
}

.el-button:active {
  border: 1px solid #fff;
}

.el-dropdown-menu {
  margin-right: 10px;
}

.el-dropdown-item a {
  text-decoration: none;
  color: #606266;
}

.el-button:hover {
  background: #fff;
}

.el-menu-demo {
  display: flex;
  justify-content: right;
}
</style>
