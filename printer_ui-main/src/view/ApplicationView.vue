<template>
  <el-row>
   <Sidebar/>
    <el-row>
      <Navbar/>
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
  </el-row>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import axios from "axios";


export default {
  components: {Sidebar,Navbar},
  data () {
    return {
      search: '',
      getSearch: 'kjnklj',
      tableData: [],
      act:false
    }
  },
  mounted() {
    axios.get('/application').then(value => {
      this.tableData =value.data.object
      console.log(this.tableData)
    })
  },
  methods: {
    handleDetails(index, row) {
      this.$alert(row.description, 'Title', {
        confirmButtonText: 'OK',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${ action }`
          });
        }
      });
    }
  },
  name: 'ApplicationView'

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


.el-table{
  width: 100%;
}

h1,p{
  text-align: left;
  margin-left: 30px;
}
p{
  color:#9B9ABA;
}

b {
  color: rgba(255,255,255);
  font-size: 18px;
  border-radius: 10px;
}


.dashboard {
  background: #F6F7FB;
  padding: 20px;
}


</style>
