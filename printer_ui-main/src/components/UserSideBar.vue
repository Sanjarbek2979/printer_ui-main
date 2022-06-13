<template>
 <div>

   <el-row>
     <el-col :span="17">
       <el-menu
         class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"  :collapse="isCollapse">
        <div class="d-flex">
          <h4 v-if="!isCollapse">User Page</h4>
          <el-button v-if="isCollapse" @click="handleCollapse"> <i class="el-icon-menu"></i></el-button>
          <el-button v-if="!isCollapse" @click="handleCollapse">x</el-button>
        </div>
<!--         <h3 style="margin: 20px"><a href="/admin">User Page</a></h3>-->
         <router-link to="/application" @click="handlePath('/application')"> <el-menu-item index="1">
           <i class="el-icon-location"></i>
           <span  slot="title"  >Application</span>
         </el-menu-item></router-link>
         <router-view/>
         <router-link to="/product" @click="handlePath('/product')"> <el-menu-item index="2">
           <i class="el-icon-menu"></i>
           <span slot="title">Product</span>
         </el-menu-item></router-link>
         <router-view/>
         <router-link to="/brand" @click="handlePath('/brand')"><el-menu-item index="3">
           <i class="el-icon-document"></i>
           <span  slot="title">Brand</span>
         </el-menu-item></router-link>
         <router-view/>
         <router-link to="/model" @click="handlePath('/Model')"><el-menu-item index="4">
           <i class="el-icon-setting"></i>
           <span  slot="title">Model</span>
         </el-menu-item></router-link>
         <router-view/>
         <router-link to="/department" @click="handlePath('/department')"> <el-menu-item index="5">
           <i class="el-icon-setting"></i>
           <span  slot="title">Department</span>
         </el-menu-item></router-link>
         <router-view/>
         <router-link to="/users/crud" @click="handlePath('/users/crud')"><el-menu-item index="6">
           <i class="el-icon-setting"></i>
           <span  slot="title">User</span>
         </el-menu-item></router-link>
         <router-view/>
         <router-link to="/role" @click="handlePath('/role')"><el-menu-item index="7">
           <i class="el-icon-setting"></i>
           <span  slot="title">Role</span>
         </el-menu-item></router-link>
         <router-view/>
         <router-link to="/permission" @click="handlePath('/permission')"><el-menu-item index="8">
           <i class="el-icon-setting"></i>
           <span  slot="title">Permission</span>
         </el-menu-item></router-link>
         <router-view/>
         <router-link to="/services" @click="handlePath('/services')"><el-menu-item index="9">
           <i class="el-icon-setting"></i>
           <span  slot="title">Services</span>
         </el-menu-item></router-link>
         <router-view/>
         <router-link to="/history" @click="handlePath('/history')"><el-menu-item index="10">
           <i class="el-icon-setting"></i>
           <span  slot="title">History</span>
         </el-menu-item></router-link>
         <router-view/>
       </el-menu>
     </el-col>
   </el-row>
 </div>
 </template>

<script>
import axios from "axios";
import auth from "@/store/modules/auth/auth";

export default {
  name: "UserSideBar",
  data() {
    return {
      isCollapse: false,
      path:''
    };
  },
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
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-item{
  text-align: left;
}
.d-flex{
  display: flex;
  justify-content: space-around;
}
.el-button{
  border: 1px solid #fff;
}
</style>
