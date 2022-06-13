<template>
  <el-row>
    <Sidebar/>
    <el-row>
      <Navbar/>
      <el-col :span="21" class="dashboard">
        <el-col :span="14">
        <LineGraph/>
        </el-col>
        <el-col :span="9">
          <el-col :span="10">
            <div class="el-badge__content--primary">
              <i class="el-icon-date"></i>
              <i class="el-icon-more"></i>
            </div>
            <h1>2455</h1>
            <p>Today's applications</p>
          </el-col>
          <el-col :span="10">
            <div class="el-badge__content--danger">
              <i class="el-icon-folder-checked"></i>
              <i class="el-icon-more"></i>
            </div>
            <h1>2455</h1>
            <p>Accepted applications</p>
          </el-col>
          <el-col :span="10">
            <div class="el-badge__content--success">
              <i class="el-icon-loading"></i>
              <i class="el-icon-more"></i>
            </div>
            <h1>2455</h1>
            <p>In process applications</p>
          </el-col>
          <el-col :span="10">
            <div class="el-badge__content--warning">
              <i class="el-icon-folder-delete"></i>
              <i class="el-icon-more"></i>
            </div>
            <h1>2455</h1>
            <p>Rejected applications</p>
          </el-col>
          <el-col :span="13">
            <div class="el-badge__content">
              <i class="el-icon-set-up"></i>
              <i class="el-icon-more"></i>
            </div>
            <h1>24900</h1>
            <p>Total applications</p>
          </el-col>
        </el-col>
        <el-col :span="11">
        <PieChart/>
        </el-col>
        <el-col :span="11">
          <h3>The most common services list</h3><hr>
          <AdminServiceList/>
        </el-col>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import axios from 'axios'
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import LineGraph from "@/components/LineGraph";
import AdminServiceList from "@/components/AdminServiceList";
import PieChart from "@/components/PieChart";
export default {
  components: {PieChart, AdminServiceList,LineGraph, Navbar,Sidebar},
  data() {
    return {
      searchingWord: '',
      getSearch: null,
      fullName: '',
    }
  },
  mounted() {
      this.$notify({
        message: 'Successfully logged in',
        type: 'success'
      });
    },
  methods: {
    getApplication() {
      axios.get('/application').then(value => {
        console.log(value)
      })
    },
    searchFunc() {
      axios
        .get('http://localhost:8088/api/department/search?searchingWord=' + this.searchingWord)
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


.el-col-14 {
  background: #ffffff;
  border-radius: 10px;
  height: 515px;
  margin: 30px;

}

.el-badge__content--primary {
  padding: 10px;
  border-radius: 10px;
  background: #8f2fe1 !important;
  display: flex;
  justify-content: space-between;
  color: #fff;
}

.el-badge__content--danger {
  padding: 10px;
  border-radius: 10px;
  background: #21b42d !important;
  display: flex;
  justify-content: space-between;
  color: #fff;
}

.el-badge__content--success {
  padding: 10px;
  border-radius: 10px;
  background: #8f8d91 !important;
  display: flex;
  justify-content: space-between;
  color: #fff;
}

.el-badge__content--warning {
  padding: 10px;
  border-radius: 10px;
  background: #ee2323 !important;
  display: flex;
  justify-content: space-between;
  color: #fff;
}

.el-badge__content {
  width: 100%;
  padding: 18px;
  border-radius: 10px;
  background: #5785d9 !important;
  display: flex;
  justify-content: space-between;
  color: #fff;
}

h1, p {
  text-align: left;
  margin-left: 30px;
}

p {
  color: #9B9ABA;
}

b {
  color: rgba(255, 255, 255);
  font-size: 18px;
  border-radius: 10px;
}

.el-col-10 {
  background: #fff;
  /*margin: 25px;*/
  margin-left: 37px;
  margin-top: 30px;
  height: 150px;
  border-radius: 10px;
}

.el-col-13 {
  background: #fff;
  height: 150px;
  margin: 30px;
  margin-left: 150px;
}

.el-col-11 {
  background: #fff;
  margin: 30px;
  border-radius: 10px;
  height: 230px;
  overflow-y: scroll;
  position: relative;
}
.el-col-11 h3{
  position: sticky;
  z-index: 1000;
  top: 0;
  background: #fff;
  margin-top: 10px;
}



.dashboard {
  background: #F6F7FB;
  padding: 20px;
}


</style>
