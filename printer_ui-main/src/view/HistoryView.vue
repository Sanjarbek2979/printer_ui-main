<template>
  <el-row>
   <SidebarView/>
    <el-row>
      <Navbar/>

    </el-row>
  </el-row>
</template>

<script>
import SidebarView from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default {
  components: {SidebarView,Navbar},
  data () {
    return {
    }
  },
  name: 'HistoryView'

}
</script>

<style scoped>

</style>
