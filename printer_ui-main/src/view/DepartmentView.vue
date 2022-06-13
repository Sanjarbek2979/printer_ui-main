<template>
  <el-row>
   <SidebarView/>
    <el-row>
      <Navbar/>
      <el-col :span="16" :offset="2" class="dashboard">

        <div>
          <el-input class="search" placeholder="Search" v-model="searchingWord">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="addDiv">
          <el-button type="button" class=" addBtn btn btn-primary btn-block " data-toggle="modal"
                     data-target="#myModal1"  >Add Department
          </el-button>
        </div>
        <el-table
          :data="tableData.filter(data => !searchingWord || data.sender.toLowerCase().includes(searchingWord.toLowerCase()))  "
          style="width: 100%"
        >
          <el-table-column

            label="On"
            width="80">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.$index +1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Id"
            width="80">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Index"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.index }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Name"
            width="400">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Region"
            width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.region }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Active"
            width="160">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.active }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Edit"
            width="130">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                class="btn btn-info btn-lg"
                data-toggle="modal"
                data-target="#myModal"
                @click="handleEdit(scope.$index, scope.row)">Edit
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="Delete"
            width="130">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="modal fade" id="myModal" data-backdrop="static" data-keyboard="false" role="dialog">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Edit Department</h4>
              </div>
              <div class="modal-body">
                <el-form  ref="anyName" label-width="100px" >
                  <el-input class="input" placeholder="Index" v-model="departmentDto.index" aria-required="true"></el-input>
                  <el-input class="input" placeholder="Name" v-model="departmentDto.name" aria-required="true"></el-input>
                  <el-select v-model="departmentDto.region"  placeholder="Select region">
                    <el-option
                      v-for="item in regions"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                  <button type="button" class="btn btn-primary btn-block "  @click="editDepartment" data-dismiss="modal">Edit</button>
                </el-form>
              </div>

            </div>

          </div>
        </div>
        <div class="modal fade" id="myModal1" data-backdrop="static" data-keyboard="false" role="dialog">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Add Department</h4>
              </div>
              <div class="modal-body">
                <el-form  ref="anyName" label-width="100px" >
                  <el-input class="input" placeholder="Department index" v-model="departmentDto.index" aria-required="true"></el-input>
                  <el-input class="input" placeholder="Department name " v-model="departmentDto.name" aria-required="true"></el-input>
                  <el-select v-model="departmentDto.region" placeholder="Select region">
                    <el-option
                      v-for="item in regions"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                  <button type="button" class="btn btn-primary btn-block " @click="addDepartment" data-dismiss="modal">Submit</button>
                </el-form>
              </div>

            </div>

          </div>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>

import SidebarView from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import axios from "axios";

export default {
  components: {SidebarView,Navbar},
  data () {
    return {
      searchingWord: '',
      tableData: [],
      departmentId:0,
      regions:[],
      departmentDto:{
        index:null,
        name:'',
        region:''
      }
    }
  },
  methods:{
    handleEdit(index,row){
      this.departmentId = row.id
      this.departmentDto.index = row.index
      this.departmentDto.name = row.name
    },
    handleDelete(index,row){
      axios.delete('/department/'+row.id).then(value => {
        console.log(value)
      })
      this.tableData.splice(index,1)

    },
    addDepartment(){
      axios.post('/department',this.departmentDto).then(value => {
        console.log(value)
      })
      window.location.reload()
      this.departmentDto.index = null
      this.departmentDto.name =''
    },
    editDepartment(){
      axios.put('/department/'+this.departmentId,this.departmentDto).then(value => {
        console.log(value)
      })
      window.location.reload()
      this.departmentDto.index = null
      this.departmentDto.name =''
    },
    callRegions(){
      axios.get('/department/regions').then(value => {
        this.regions = value.data.object
        console.log(value)
      })
    }
  },
  mounted() {
    axios.get('/department').then(value => {
      this.tableData = value.data.object
      console.log(value)
      this.callRegions()
    })
  },
  name: 'DepartmentView'

}
</script>

<style scoped>

.el-table .warning-row {
  background: oldlace;
}


.el-table .success-row {
  background: #f0f9eb;
}

.el-table__cell{
  display: block !important;
}

.el-select{
  width: 100%;
  margin-bottom: 10px;
}
.el-table{
  width: 100%;
}
.input{
  margin-bottom: 20px;
}

.dashboard {
  background: #F6F7FB;
  padding: 20px;
  position: relative;
}
.search {
  width: 20%;
  position: absolute;
  top: -50px;
  right: 0px;
}

</style>
