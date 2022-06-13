<template>
    <div id="app">
      <router-view/>
    </div>
</template>

<script>
// import AdminView from "@/view/AdminView";
// import LoginView from "@/view/LoginView";

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
* {
  padding: 0px;
  margin-left: 0px;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
