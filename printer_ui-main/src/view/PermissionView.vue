<template>
  <el-row>
    <SidebarView/>
    <el-row>
      <Navbar/>
      <el-col :span="12" :offset="4" class="dashboard">
        <div>
          <el-input class="search" placeholder="Search" v-model="searchingWord">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="addDiv">
          <el-button type="button" class=" addBtn btn btn-primary btn-block " data-toggle="modal"
                     data-target="#myModal1">Add permission
          </el-button>
        </div>
        <el-table
          :data="tableData.filter(data => !searchingWord || data.value.toLowerCase().includes(searchingWord.toLowerCase()))  "
          style="width: 100%"
        >
          <el-table-column
            label="Index"
            width="160">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Id"
            width="160">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="name"
            width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.value }}</span>
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

        <div class="modal fade" id="myModal" data-backdrop="static" data-keyboard="false" role="dialog">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Edit Service</h4>
              </div>
              <div class="modal-body">
                <el-form  ref="anyName" label-width="100px" >
                  <el-input class="input" placeholder="Name" v-model="permissionsDto.value" aria-required="true"></el-input>
                  <button type="button" class="btn btn-primary btn-block "  @click="editPermission" data-dismiss="modal">Edit</button>
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
                <h4 class="modal-title">Add Permission</h4>
              </div>
              <div class="modal-body">
                <el-form  ref="anyName" label-width="100px" >
                  <el-input class="input" placeholder="Name" v-model="permissionsDto.value" aria-required="true"></el-input>
                  <button type="button" class="btn btn-primary btn-block " @click="addPermission" data-dismiss="modal">Submit</button>
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
  components: {SidebarView, Navbar},
  data() {
    return {
      searchingWord: '',
      tableData: [],
      act: false,
      permissionId: 0,
      permissionsDto: {
        value: ''
      }
    }
  },
  methods: {
    open1() {
      this.$notify({
        message: 'this name already exists',
        type: 'warning'
      });
    },
    handleEdit(index, row) {
      this.permissionsDto.value = row.value
      this.permissionId = row.id
    },
    handleDelete(index, row) {
      this.permissionId = row.id
      axios.delete('/permission/' + row.id).then(value => {
        console.log(value)
        this.tableData.splice(index, 1)
      })
    },
    editPermission(){
      axios.put('/permission/' + this.permissionId,this.permissionsDto).then(value => {
        console.log(value)
        window.location.reload()
      }).catch(reason => {
        console.log(reason)
        if (reason.response.status === 500){
          this.open1()
        }
      })

      this.permissionsDto.value=''
    },
    addPermission (){
      axios.post('/permission',this.permissionsDto).then(value =>
        console.log(value))
      this.permissionsDto.value=''
      window.location.reload()
    }
  }
  ,
  mounted() {
    axios.get('/permission').then(value => {
      this.tableData = value.data.object
    })
  },
  name: 'PermissionView'

}
</script>

<style scoped>

.el-table .warning-row {
  background: oldlace;
}

.addDiv {
  text-align: right;
}

.el-table .success-row {
  background: #f0f9eb;
}

.el-table__cell {
  display: block !important;
}

/*.addBtn {*/
/*  width: 20%;*/
/*  right: 10px;*/
/*  position: sticky;*/
/*  top: 0px;*/
/*}*/

.search {
  width: 30%;
  position: absolute;
  top: -50px;
  right: 0px;
}


.el-table {
  width: 100%;
}

.dashboard {
  background: #F6F7FB;
  padding: 20px;
  position: relative;
}
</style>
