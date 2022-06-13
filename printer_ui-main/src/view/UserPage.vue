<template>
 <div>
 <el-row >
   <Navbar/>
 </el-row>
<el-row class="userPage">
  <el-col>
    <div>
      <h3>Application form</h3>
      <el-form  ref="anyName" label-width="100px" >
        <textarea   v-model="applicationDto.description" placeholder="text here"></textarea>
        <el-select style="width: 70%" v-model="applicationDto.receiverId"  placeholder="Select Receiver">
          <el-option
            v-for="item in receivers"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select><br>
        <div style="width: 100%;border: none;margin-top: 0" v-for="(input,index) in total" :key="`phoneInput-${index}`">
          <el-select  style="width: 25% " v-model="input.addProductId"     placeholder="Select product">
            <el-option
              v-for="item in products"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-select style="width: 25%;margin: 30px" v-model="input.addServiceId"   placeholder="Select Service">
            <el-option
              v-for="item in services"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>

          <el-input type="number" style="width: 25%" class="input" placeholder="Amount" v-model="input.amount" aria-required="true"></el-input>
          <span>
        <button type="button" @click="addField(total)"  class="btn addFieldBtn">+</button>
        <button  class="btn deleteFieldBtn" @click="removeField(index,total)">-</button>
      </span>
        </div>
       <br>

        <button type="button" class="btn btn-primary btn-block " @click="addApplication" data-dismiss="modal">Submit</button>
      </el-form>

    </div>
  </el-col>
</el-row>
   <FooterView class="footer"/>
 </div>
</template>

<script>

import axios from "axios";
import Navbar from "@/components/NavbarUser";
import FooterView from "@/components/FooterView";
// import UserSideBar from "@/components/UserSideBar";

export default {
  name: "HomeView",
  components:{FooterView, Navbar},
  data (){
    return {
      applicationDto:{
        description:'',
        receiverId:null,
        productIds:[],
        serviceIds: [],
        amount:[]
      },
      total:[
        {
          addProductId:null,
          addServiceId:null,
          amount:null
        },
      ],
      receivers:[],
      products:[],
      services:[]
    }
  },
  mounted() {
    this.$notify({
      message: 'Successfully logged in',
      type: 'success'
    });
   this.callProducts()
    this.callServices()
    this.callUsers()
  },
  methods: {
    handleClick() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    addField(total){
      total.push({})
    },
    removeField(index,total){
     if(total.length>1){
       total.splice(index,1)
     }
    },
    addApplication(){
      for (let i = 0; i < this.total.length; i++) {
       this.applicationDto.productIds.push(this.total[i].addProductId)
       this.applicationDto.serviceIds.push(this.total[i].addServiceId)
       this.applicationDto.amount.push(this.total[i].amount)
      }
      console.log(this.applicationDto)
      axios.post('/application/save',this.applicationDto).then(value => {
        console.log(value)
      })
     window.location.reload()
    },

    callUsers(){
      axios.get('/user').then(value => {
        this.receivers = value.data.object
      })
    },
    callProducts(){
      axios.get('/product').then(value => {
        console.log(value)
        this.products = value.data.object
      })
    },
    callServices(){
      axios.get('/services').then(value => {
        this.services = value.data.object
      })
    }
  }
}
</script>

<style scoped>

.footer{
  position: fixed;
  z-index: 1000;
  bottom: 0px;
  width: 100%;

}
.el-col div{
  border: 1px solid rgba(0,0,0,0.2);
  border-radius: 5px;
  margin: 0 auto;
  width: 26%;
  margin-top:5% ;
  position: relative;
}

.addFieldBtn , .deleteFieldBtn{
  margin: 10px;
  border-radius: 50%;
}
.addFieldBtn{
  color: #fff;
  background: #2c85dc;
}
.deleteFieldBtn{
  color: #fff;
  background: #e35050;
}
span {
  position: absolute;
  right: 6%;
  bottom: -20%;
}
.btn-block{

  margin: 0 auto;
  margin-top: 40px;
  margin-bottom: 20px;
  width: 70%;
}
textarea{
  width: 80%;
  padding: 10px;
  height: 100px;
}
</style>
