<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    stripe
  >
    <el-table-column
      label="Index"
      width="80"
    >
      <template  slot-scope="scope">
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
      width="260"
      >
      <template slot-scope="scope">
        <span style="margin-left: 10px ">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Price"
      width="160"

    >
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.price }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Active"
      width="140">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.active }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminServiceList",
  mounted() {
    this.callServices()
  },
  methods: {
    callServices(){
      axios.get('/services').then(value => {
        this.tableData = value.data.object
      })
    }
  },
  data() {
    return {
      tableData:  []
    }
  }
}
</script>

<style scoped>
el-table .warning-row{
  background: red !important;
}
</style>
