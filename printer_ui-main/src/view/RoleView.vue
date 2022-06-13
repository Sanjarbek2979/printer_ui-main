<template>
  <el-row>
 <SidebarView/>
    <el-row>
      <Navbar/>
      <el-col :span="15" :offset="3" class="dashboard">
        <div>
          <el-input class="search" placeholder="Search" v-model="searchingWord">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="addDiv">
          <el-button type="button" class=" addBtn btn btn-primary btn-block " data-toggle="modal"
                     data-target="#myModal1" @click="callPermissions">Add Role
          </el-button>
        </div>
        <el-table
          :data="tableData.filter(data => !searchingWord || data.name.toLowerCase().includes(searchingWord.toLowerCase()))  "
          style="width: 100%"
        >
          <el-table-column
            label="Index"
            width="80">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
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
            label="Name"
            width="160">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            class="scroll"
            label="Permissions"
            width="400">
            <template slot-scope="scope">
              <span style="margin-left: 10px" v-for="(d,i) in scope.row.permissions" :key="i">{{d.value + ' '}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Active"
            width="160"
          >
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
        <div class="modal fade" id="myModal1" role="dialog" data-backdrop="static" data-keyboard="false">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Add Role</h4>
              </div>
              <div class="modal-body">
                <el-form  ref="anyName" label-width="100px" >
                  <el-input class="input" placeholder="Name" v-model="roleDto.name" aria-required="true"></el-input>
                  <el-select v-model="roleDto.permissionIds" multiple placeholder="Select">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id"
                      >
                    </el-option>
                  </el-select>
                  <button type="button" class="btn btn-primary btn-block " @click="addRole" data-dismiss="modal">Submit</button>
                </el-form>
              </div>

            </div>

          </div>
        </div>

        <div class="modal fade" id="myModal" data-backdrop="static" data-keyboard="false" role="dialog">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Edit Role</h4>
              </div>
              <div class="modal-body">
                <el-form  ref="anyName" label-width="100px" >
                  <el-input class="input" placeholder="Name" v-model="roleDto.name" aria-required="true"></el-input>
                  <el-select v-model="roleDto.permissionIds" multiple placeholder="Select">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <button type="button" class="btn btn-primary btn-block "  @click="editRole" data-dismiss="modal">Edit</button>
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
  mounted() {
    axios.get('/role').then(value => {
      console.log(value)
      this.callPermissions()
      this.tableData = value.data.object

    })
  },
  data () {
    return {
      permissionName: [],
      searchingWord: '',
      getSearch: 'kjnklj',
      tableData: [],
      options:[],
      act:false,
      roleId:0,
      roleDto: {
        name: '',
        permissionIds:[]
      }
    }
  },
  methods:{
    addRole(){
      axios.post('/role',this.roleDto).then(value => {
        console.log(value)
      })
      window.location.reload()
      this.roleDto.name = ''
      this.roleDto.permissionIds.clear()
    },
    handleEdit(index,row){
      this.roleDto.name = row.name
      this.roleId = row.id
    },
    handleDelete(index,row){
      this.roleId =row.id
      axios.delete('/role/' + this.roleId).then(value => {
        console.log(value)
      })
      this.tableData.splice(index,1)
      window.location.reload()
    },
    editRole(){
      axios.put('/role/' + this.roleId,this.roleDto).then(value => {
        console.log(value)
      })
      window.location.reload()
      this.roleDto.name = ''
      this.roleDto.permissionIds.clear()
    },
    callPermissions(){
      axios.get('/permission').then(value => {
        this.options = value.data.object
        console.log(this.options)
      })
    }
  },
  name: 'RoleView'

}
</script>

<style scoped>

.el-table .warning-row {
  background: oldlace;
}

.el-select{
  width: 100%;
  margin: 10px 0px;
}
.el-table .success-row {
  background: #f0f9eb;
}

.el-table__cell{
  display: block !important;
}

.el-table{
  width: 100%;
}
.search {
  width: 20%;
  position: absolute;
  top: -50px;
  right: 0px;
}


.dashboard {
  background: #F6F7FB;
  padding: 20px;
  position: relative;
}
</style>
