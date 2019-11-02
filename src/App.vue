<template>
  <div id="app">
    <mainLayout />
  </div>
</template>

<script>
import mainLayout from "./layouts/mainLayout.vue"
export default {
  name: 'app',
  components: {
    mainLayout
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0px;
  text-align: center;
  color: #2c3e50;
  overflow-x: auto;
  background: url('~@/assets/background.jpg');  
}

body{
  margin:0px;
  overflow-x: nono;
}
</style>
