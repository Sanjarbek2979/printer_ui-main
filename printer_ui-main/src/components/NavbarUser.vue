<template>
  <el-col :span="24">
    <el-menu class="el-menu-demo">
      <el-menu-item>
        <a href="/showHistory" @click="handlePath('/showHistory')">Show History</a>
      </el-menu-item>
      <el-menu-item class="Avatar" index="3">
        <i class="el-icon-user-solid"></i>
      </el-menu-item>
      <el-dropdown trigger="click">
        <el-button>
          Ruzimboy
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
        <el-button v-on:click="onFormChange">Change password</el-button>
      </el-form>
    </el-col>
  </el-col>

</template>

<script>
import axios from "axios";

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
      fullName: localStorage.getItem('currentUser'),
      path: ''
    }
  },
  methods: {
    changePassword() {
      this.isChange = !this.isChange
    },
    open1() {
      this.$notify({
        message: 'password lar mos kelmadi kurra boja',
        type: 'error'
      });
    },
    onFormChange() {
      this.isChange = !this.isChange
      if (this.prePassword !== this.changePasswordDto.newPassword) {
        this.open1();
        this.isChange = !this.isChange
      }
      axios.post('/user/change/password', {'changePasswordDTO': this.changePasswordDto}).then(value => {
        console.log(value)
      })
    },
    handleClick() {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('username');
      this.$router.push('/');
    },
    searchFunc() {
      axios
        .get('http://localhost:8088/api/department/search?searchingWord=' + this.searchingWord)
        .then(response => {
          this.getSearch = response.data.object
          console.log(this.departments)
        })
    },
    handlePath(path) {
      console.log("hey")
      this.$router.push(path)
    },

  },
  name: 'AdminView'
}
</script>

<style scoped>
.el-col-24 {
  position: relative;
}

.el-menu {
  background: #464646;
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

.el-icon-user-solid {
  color: #fff;
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

/*.el-button:hover {*/
/*  background: #fff;*/
/*}*/

.el-menu-demo {
  display: flex;
  justify-content: right;
}
.el-menu-item a{
  color: white;
  font-size: 15px;
  text-decoration: none;
}
.el-menu-item:hover{
  background: transparent;
}
</style>
