<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Gerencianet />
  </div>
</template>

<script>
import Gerencianet from './components/Gerencianet.vue'

export default {
  name: 'App',
  components: {
    Gerencianet

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
@import '~bootstrap/dist/css/bootstrap.css'
</style>
