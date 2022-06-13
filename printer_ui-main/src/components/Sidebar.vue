<template>
  <el-col  v-if="!isCollapse" :span="3"   >

    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen" @close="handleClose"   :collapse="isCollapse">
      <div class="d-flex">
        <h4  v-if="!isCollapse"><a href="/admin">Admin Page</a></h4>
<!--        <el-button v-if="isCollapse" @click="handleCollapse"> <i class="`el-icon-menu"></i></el-button>-->
        <a v-if="!isCollapse" style="margin: 10px;" @click="handleCollapse"><i class="el-icon-close"></i></a>
      </div>
<!--      <h3 style="margin: 20px"><a href="/admin">Admin Page</a></h3>-->
      <router-link to="/application" @click="handlePath('/application')"> <el-menu-item index="1">
        <i class="el-icon-document"></i>
       <span slot="title">Application</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/product" @click="handlePath('/product')"> <el-menu-item index="2">
        <i class="el-icon-goods"></i>
       <span slot="title">Product</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/brand" @click="handlePath('/brand')"><el-menu-item index="3">
        <i class="el-icon-printer"></i>
       <span slot="title">Brand</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/model" @click="handlePath('/Model')"><el-menu-item index="4">
        <i class="el-icon-collection"></i>
       <span slot="title">Model</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/department" @click="handlePath('/department')"> <el-menu-item index="5">
        <i class="el-icon-office-building"></i>
       <span slot="title">Department</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/users/crud" @click="handlePath('/users/crud')"><el-menu-item index="6">
        <i class="el-icon-user-solid"></i>
       <span slot="title">User</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/role" @click="handlePath('/role')"><el-menu-item index="7">
        <i class="el-icon-s-cooperation"></i>
       <span slot="title">Role</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/permission" @click="handlePath('/permission')"><el-menu-item index="8">
        <i class="el-icon-warning"></i>
       <span slot="title">Permission</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/services" @click="handlePath('/services')"><el-menu-item index="9">
        <i class="el-icon-setting"></i>
        <span slot="title">Services</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/history" @click="handlePath('/history')"><el-menu-item index="10">
        <i class="el-icon-files"></i>
        <span slot="title">History</span>
      </el-menu-item></router-link>
      <router-view/>
    </el-menu>
  </el-col>
  <el-col  v-else-if="isCollapse" :span="1"   >

    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen" @close="handleClose"   :collapse="isCollapse">
      <div class="d-flex">
        <h4  v-if="!isCollapse"><a href="/admin">Admin Page</a></h4>
        <el-button class="menuBtn" v-if="isCollapse" @click="handleCollapse"> <i class="el-icon-s-grid"></i></el-button>
      </div>
      <!--      <h3 style="margin: 20px"><a href="/admin">Admin Page</a></h3>-->
      <router-link to="/application" @click="handlePath('/application')"> <el-menu-item index="1">
        <i class="el-icon-document"></i>
        <span slot="title">Application</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/product" @click="handlePath('/product')"> <el-menu-item index="2">
        <i class="el-icon-goods"></i>
        <span slot="title">Product</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/brand" @click="handlePath('/brand')"><el-menu-item index="3">
        <i class="el-icon-printer"></i>
        <span slot="title">Brand</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/model" @click="handlePath('/Model')"><el-menu-item index="4">
        <i class="el-icon-collection"></i>
        <span slot="title">Model</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/department" @click="handlePath('/department')"> <el-menu-item index="5">
        <i class="el-icon-office-building"></i>
        <span slot="title">Department</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/users/crud" @click="handlePath('/users/crud')"><el-menu-item index="6">
        <i class="el-icon-user-solid"></i>
        <span slot="title">User</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/role" @click="handlePath('/role')"><el-menu-item index="7">
        <i class="el-icon-s-cooperation"></i>
        <span slot="title">Role</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/permission" @click="handlePath('/permission')"><el-menu-item index="8">
        <i class="el-icon-warning"></i>
        <span slot="title">Permission</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/services" @click="handlePath('/services')"><el-menu-item index="9">
        <i class="el-icon-setting"></i>
        <span slot="title">Services</span>
      </el-menu-item></router-link>
      <router-view/>
      <router-link to="/history" @click="handlePath('/history')"><el-menu-item index="10">
        <i class="el-icon-files"></i>
        <span slot="title">History</span>
      </el-menu-item></router-link>
      <router-view/>
    </el-menu>
  </el-col>
</template>

<script>
import axios from "axios";
import auth from "@/store/modules/auth/auth";

export default {
  name: "SidebarView",
  methods: {
    handleCollapse (){
      this.isCollapse =!this.isCollapse
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
   handlePath(path) {
      this.$router.push(path)
      axios.get('/department',{
        headers: {
          'Authorization': 'Bearer ' + auth.state.token
        }
      }).then(value => {
        console.log(value)
      })
    },
  },
  data(){
    return{
      isCollapse: false,
      path:''
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo {
  border:0px
  /*width: 200px;*/
  /*min-height: 400px;*/
}
.d-flex{
  display: flex;
  justify-content: space-around;
}
.el-menu a{
  text-decoration: none;
  color: #fff;
}
.el-menu-item{
  background: #fff;
}
.el-col-3 {
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: 100vh;
  background: rgb(84, 92, 100);
}
.el-col-1 {
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: 100vh;
  background: rgb(84, 92, 100);
}
.menuBtn{
  background: transparent;
  color: #fff;
  border:none;
}
.el-menu {
  z-index: 1000;
}
h3 a{
  text-decoration: none;
  color: #fff;
}
.el-menu-item {
  text-align: left;
}

</style>
