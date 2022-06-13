<template>
<h1>Home page</h1>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  data (){
    return {
    }
},
  mounted() {
      axios.get('/auth/me'  ).then(response => {
        console.log(response.data)
        // if (response.data.role.name === 'USER') {
        //   this.$router.push('/user')
        // } else if (response.data.role.name === 'ADMIN') {
        //   this.$router.push('/admin')
        // }
      })
  }
}
</script>

<style scoped>

</style>
