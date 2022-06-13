<template>
  <el-row>
   <SidebarView/>
    <el-row>
      <Navbar/>
      <el-col :span="13" :offset="4" class="dashboard">
        <div>
          <el-input class="search" placeholder="Search" v-model="searchingWord">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="addDiv">
          <el-button type="button" class=" addBtn btn btn-primary btn-block " data-toggle="modal"
                     data-target="#myModal1"  >Add Model
          </el-button>
        </div>
        <el-table
          :data="tableData.filter(data => !searchingWord || data.name.toLowerCase().includes(searchingWord.toLowerCase()))  "
          style="width: 100%"
        >
          <el-table-column
            label="Index"
            width="160">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.$index +1}}</span>
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
            width="160">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
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
            width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                data-toggle="modal"
                data-target="#myModal"
                @click="handleEdit(scope.$index, scope.row)">Edit
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="Delete"
            width="200">
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
                <h4 class="modal-title">Add Model</h4>
              </div>
              <div class="modal-body">
                <el-form  ref="anyName" label-width="100px" >
                  <el-input class="input" placeholder="Name" v-model="modelDto.name" aria-required="true"></el-input>
                  <button type="button" class="btn btn-primary btn-block " @click="addModel" data-dismiss="modal">Submit</button>
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
                <h4 class="modal-title">Edit Model</h4>
              </div>
              <div class="modal-body">
                <el-form  ref="anyName" label-width="100px" >
                  <el-input class="input" placeholder="Name" v-model="modelDto.name" aria-required="true"></el-input>
                  <button type="button" class="btn btn-primary btn-block "  @click="editModel" data-dismiss="modal">Edit</button>
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
  data (){
    return {
      searchingWord: '',
      tableData: [],
      options:[],
      modelId:0,
      modelDto:{
        name:''
      }
    }
  },
  mounted() {
    axios.get('/model').then(value => {
      this.tableData =value.data.object
    })
  },
  methods: {
    handleEdit(index,row){
      this.modelId = row.id
      this.modelDto.name =row.name
    },
    handleDelete(index,row){
      axios.delete('/model/'+row.id).then(value => {
        console.log(value)
      })
      this.tableData.splice(index,1)
    },
    addModel(){
      axios.post('/model',this.modelDto).then(value => {
        console.log(value)
      })
      window.location.reload()
      this.modelDto.name =''
    },
    editModel(){
      axios.put('/model/'+this.modelId,this.modelDto).then(value => {
        console.log(value)
      })
      window.location.reload()
      this.modelDto.name =''
    }
  },
  name: 'ModelView',
  components: {SidebarView,Navbar},
}
</script>

<style scoped>
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
.input{
  margin-bottom: 20px;
}

</style>
