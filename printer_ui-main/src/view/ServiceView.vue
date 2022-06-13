<template>
  <el-row>
   <SidebarView/>
    <el-row>
      <Navbar/>
      <el-col :span="15" :offset="3"  class="dashboard">
        <div>
          <el-input class="search" placeholder="Search" v-model="searchingWord">
            <el-button slot="append" icon="el-icon-search" ></el-button>
          </el-input>
        </div>
        <el-button  type="button" class=" addBtn btn btn-primary btn-block "  data-toggle="modal"
                    data-target="#myModal1" >Add Service</el-button>
        <el-table
          :data="tableData.filter(data => !searchingWord || data.name.toLowerCase().includes(searchingWord.toLowerCase()))  "
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
            label="Name"
            width="260">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Price"
            width="260">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Active"
            width="260">
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
                  <el-input class="input" placeholder="Name" v-model="servicesDTO.name" aria-required="true"></el-input>
                  <el-input class="input" type="number" placeholder="Price" v-model="servicesDTO.price" ></el-input>
                  <button type="button" class="btn btn-primary btn-block "  @click="editService" data-dismiss="modal">Edit</button>
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
                <h4 class="modal-title">Add Service</h4>
              </div>
              <div class="modal-body">
                <el-form  ref="anyName" label-width="100px" >
                  <el-input class="input" placeholder="Name" v-model="servicesDTO.name" aria-required="true"></el-input>
                  <el-input class="input" type="number" placeholder="Price" v-model="servicesDTO.price" ></el-input>
                  <button type="button" class="btn btn-primary btn-block " @click="addService" data-dismiss="modal">Submit</button>
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
  name: 'ServiceView',
  mounted() {
   this.getServices()
  }
  ,
methods : {
  open1() {
    this.$notify({
      message: 'this name already exists',
      type: 'warning'
    });
  },
    getServices(){
      axios.get('/services').then(value => {
        this.tableData = value.data.object
      })
    },
  handleEdit(index , row){
    this.servicesDTO.name=row.name
    this.servicesDTO.price=row.price
    this.serviceId = row.id
    // console.log(row)
  },
  handleDelete(index , row){
    this.serviceId = row.id
    axios.delete('/services/' + this.serviceId).then(value => {
      console.log(value)
      this.tableData.splice(index,1)
    })
  },
  editService(){
    axios.put('/services/' + this.serviceId,this.servicesDTO).then(value => {
      console.log(value)
      window.location.reload()
    }).catch(reason => {
      console.log(reason)
      if (reason.response.status === 500){
        this.open1()
      }
    })

    this.servicesDTO.name=''
    this.servicesDTO.price=0
  },
  addService (){
    axios.post('/services',this.servicesDTO).then(value =>
      console.log(value))
    this.servicesDTO.name=''
    this.servicesDTO.price=0
    window.location.reload()

  },
}
,
  data () {
    return {
      searchingWord: '',
      getSearch: 'kjnklj',
      tableData: [],
      act:false,
      showModal:false,
      servicesDTO:{
        name: '',
        price: 0
      },
      serviceId:0
    }
  }
}
</script>

<style scoped>
.dashboard {
  background: #F6F7FB;
  padding: 20px;
  position: relative;
}
#myModal,#myModal1{
  padding-top: 10%;
}
.el-form{
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
}
.btn{
  padding: 10px;
}
.addBtn{
  margin: 10px;
}
/*.el-col-15{*/
/*  text-align: right;*/
/*}*/

.search{
  width: 20%;
  position: absolute;
  top: -50px;
  right: 0px;
}


.input{
  margin-bottom: 10px;
  color: #898989;

}
</style>
