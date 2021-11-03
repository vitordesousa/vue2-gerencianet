<template>
  <div id="app">
    <div class="container text-center">
      <img alt="Vue logo" src="./assets/logo.png"> | <img alt="Vue logo" src="./assets/gerencianet.png">
    </div>
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
