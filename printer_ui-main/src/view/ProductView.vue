<template>
  <el-row>
  <SidebarView/>
    <el-row>
      <Navbar/>
      <el-col :span="17" :offset="2 " class="dashboard">
        <div>
          <el-input class="search" placeholder="Search" v-model="searchingWord">
            <el-button slot="append" icon="el-icon-search" ></el-button>
          </el-input>
        </div>
        <el-button  type="button" class=" addBtn btn btn-primary btn-block "  data-toggle="modal"
                    data-target="#myModal1" >Add Product</el-button>
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
            label="name"
            width="160">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            class="scroll"
            label="Services"
            width="300">
            <template slot-scope="scope">
              <span style="margin-left: 10px" v-for="(d,i) in scope.row.serviceList" :key="i">{{d.name + ' '}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Brand"
            width="140">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.brand.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Model"
            width="140">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.model.name }}</span>
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

        <div class="modal fade" id="myModal1" data-backdrop="static" data-keyboard="false" role="dialog">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Add Product</h4>
              </div>
              <div class="modal-body">
                <el-form  ref="anyName" label-width="100px" >
                  <el-input class="input" placeholder="Name" v-model="productDto.name" aria-required="true"></el-input>
                  <el-select v-model="productDto.serviceIds" multiple placeholder="Select Services">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>

                  <el-select v-model="productDto.brandId"  placeholder="Select brand">
                    <el-option
                      v-for="item in brands"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <el-select v-model="productDto.modelId"  placeholder="Select model">
                    <el-option
                      v-for="item in models"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <button type="button" class="btn btn-primary btn-block " @click="addProduct" data-dismiss="modal">Submit</button>
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
                <h4 class="modal-title">Edit Product</h4>
              </div>
              <div class="modal-body">
                <el-form  ref="anyName" label-width="100px" >
                  <el-input class="input" placeholder="Name" v-model="productDto.name" aria-required="true"></el-input>
                  <el-select v-model="productDto.serviceIds" multiple placeholder="Select services">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <el-select v-model="productDto.brandId"  placeholder="Select brand">
                    <el-option
                      v-for="item in brands"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <el-select v-model="productDto.modelId"  placeholder="Select model">
                    <el-option
                      v-for="item in models"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                  <button type="button" class="btn btn-primary btn-block "  @click="editProduct" data-dismiss="modal">Edit</button>
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
    axios.get('/product').then(value => {
      this.tableData = value.data.object
      console.log(value)
      this.callServices()
      this.callBrands()
      this.callModels()
    })

  },
  methods: {
    addProduct (){
      axios.post('/product',this.productDto).then(value => {
        console.log(value)
      })
      window.location.reload()
      this.productDto.name = ''
    },
    handleEdit(index,row) {
     this.productId = row.id
      this.productDto.name =row.name
    },
    handleDelete(index,row){
      axios.delete('/product/'+row.id).then(value => {
        console.log(value)
      })
      window.location.reload()
    },
    editProduct(){
      axios.put('/product/' + this.productId,this.productDto).then(value => {
        console.log(value)
      })
      window.location.reload()
      this.productDto.name=''
    },
    callServices (){
      axios.get('/services').then(value => {
        this.options = value.data.object
        console.log(value)
      })
    },
    callBrands(){
      axios.get('/brand').then(value => {
        this.brands = value.data.object
      })
    },
    callModels(){
      axios.get('/model').then(value => {
        this.models = value.data.object
      })
    }
  },
  data () {
    return {
      searchingWord: '',
      getSearch: '',
      tableData: [],
      act:false,
      options:[],
      brands:[],
      models:[],
      productId:0,
      productDto:{
        name: '',
        serviceIds:[],
        modelId:null,
        brandId:null
      }
    }
    },
  name: 'ProductView'

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
  margin: 10px 0px;
}

.el-table{
  width: 100%;
}

.dashboard {
  background: #F6F7FB;
  padding: 20px;
  position: relative;
}
.search{
  width: 20%;
  position: absolute;
  top: -50px;
  right: 0px;
}
</style>
