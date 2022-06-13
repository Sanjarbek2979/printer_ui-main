<template>
 <div>
   <Navbar/>
   <el-row>
     <el-col :span="21" class="dashboard">
       <el-table
         :data="tableData"
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
           label="SenderDepartment"
           width="400">
           <template slot-scope="scope">
             <span style="margin-left: 10px">{{ scope.row.senderDepartment.name }}</span>
           </template>
         </el-table-column>
         <el-table-column
           label="Sender"
           width="200">
           <template slot-scope="scope">
             <span style="margin-left: 10px">{{ scope.row.sender.fullName }}</span>
           </template>
         </el-table-column>
         <el-table-column
           label="ReceiverDepartment"
           width="400">
           <template slot-scope="scope">
             <span style="margin-left: 10px">{{ scope.row.receiverDepartment.name }}</span>
           </template>
         </el-table-column>
         <el-table-column
           label="Responsible Staff"
           width="260">
           <template slot-scope="scope">
             <span style="margin-left: 10px">{{ scope.row.responsibleStaff.fullName }}</span>
           </template>
         </el-table-column>
         <el-table-column
           label="Date"
           width="400">
           <template slot-scope="scope">
             <span style="margin-left: 10px">{{new Date( scope.row.date)}}</span>
           </template>
         </el-table-column>
         <el-table-column
           label="CreatedAt"
           width="400">
           <template slot-scope="scope">
             <span style="margin-left: 10px">{{new Date( scope.row.createdAt)}}</span>
           </template>
         </el-table-column>
         <el-table-column
           label="CreatedBy"
           width="200">
           <template slot-scope="scope">
             <span style="margin-left: 10px">{{scope.row.createdBy}}</span>
           </template>
         </el-table-column>
         <el-table-column
           label="UpdatedAt"
           width="400">
           <template slot-scope="scope">
             <span style="margin-left: 10px">{{new Date(scope.row.updatedAt)}}</span>
           </template>
         </el-table-column>
         <el-table-column
           label="UpdatedBy"
           width="200">
           <template slot-scope="scope">
             <span style="margin-left: 10px">{{ scope.row.updatedBy }}</span>
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
       </el-table>
     </el-col>
   </el-row>
 </div>
</template>

<script>
import Navbar from "@/components/NavbarUser";
export default {
  name: "showHistory",
  components:{Navbar},
  methods:{

  },
  data(){
    return{
      path:''
    }
  }
}
</script>

<style scoped>

</style>
