<template>
  <el-row>
    <SidebarView/>
    <el-row>
      <Navbar/>

      <el-col :span="21" class="dashboard">
        <div>
          <el-input class="search" placeholder="Search" v-model="searchingWord">
            <el-button slot="append" icon="el-icon-search" ></el-button>
          </el-input>
        </div>
        <el-table
          :data="tableData.filter(data => !searchingWord || data.fullName.toLowerCase().includes(searchingWord.toLowerCase())) "
          style="width: 100%"
        >
          <el-table-column
            label="Index"
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
            label="Fullname"
            width="260">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.fullName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Username"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Password"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.password }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Role"
            width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.role.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Department"
            width="360">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.department.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Active"
            width="130">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.active }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="Details"
            width="130">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                data-toggle="modal"
                data-target="#myModal"
                @click="handleDetails(scope.$index, scope.row)">Details
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="Block"
            width="130">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleBlock(scope.$index, scope.row)"><div v-if="scope.row.enabled">Block </div> <div v-else-if="scope.row.enabled===false">Unblock</div>
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
                <h4 class="modal-title">User details</h4>
              </div>
              <div class="modal-body">

                <el-table

                  style="width: 100%"
                >
                  <el-table-column
                    label="Id"
                    width="80">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="Fullname"
                    width="260">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.fullName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="Username"
                    width="180">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.username }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="Password"
                    width="180">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.password }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="Role"
                    width="180">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.role.name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="Department"
                    width="360">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.department.name }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="Active"
                    width="130">
                    <template slot-scope="scope">
                      <span style="margin-left: 10px">{{ scope.row.active }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    label="Details"
                    width="130">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="primary"
                        data-toggle="modal"
                        data-target="#myModal"
                        @click="handleDetails(scope.$index, scope.row)">Details
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="Block"
                    width="130">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleBlock(scope.$index, scope.row)"><div v-if="scope.row.enabled">Block </div> <div v-else-if="scope.row.enabled===false">Unblock</div>
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>


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
  mounted() {
    axios.get('/user').then(value => {
      this.tableData = value.data.object
      console.log(value)
    })
  },
  data() {
    return {
      searchingWord: '',
      getSearch: 'kjnklj',
      tableData: [],
      userDetails:null,
      userDetailsId:0,

      act: false,
    }
  },
  methods:{

    handleDetails (index,row){
       this.userDetails =row
      console.log(this.userDetails)
        // console.log(value)
    },
    handleBlock (index,row) {
      if (row.enabled === true){
      axios.get('/user/block/'+row.id).then(value => {
        console.log(value)
      })
      }
      else if(row.enabled === false){
        axios.get('/user/unblock/'+row.id).then(value => {
          console.log(value)
        })
      }
      window.location.reload()
    }
  },
  name: 'UserView'

}
</script>

<style scoped>

.el-table .warning-row {
  background: oldlace;
}


.el-table .success-row {
  background: #f0f9eb;
}

.el-table__cell {
  display: block !important;
}

.el-table {
  width: 100%;
}
.search{
  width: 20%;
  position: absolute;
  top: -50px;
  right: 150px;
}

.dashboard {
  background: #F6F7FB;
  padding: 20px;
  position: relative;
}
#myModal{

}
.modal-content{
  position: absolute;
  width:1400px;
  left: -300px;
  top: 100px;
}
</style>
