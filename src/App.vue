<template>
  <div id="app">
    <img class="logo" src="assets/images/logo.png">
    <h2>
      Hello world, Vue.js
    </h2>
    <p>
      <a v-link="{path: '/a'}">Page A</a>
      <a v-link="{path: '/b'}">Page B</a>
      <a v-link="{path: '/c'}">Page C</a>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
  import Hello from './components/Hello';
  export default {
    components: {
      Hello
    }
  };
</script>

<style>
  html {
    height: 100%;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  #app {
    color: #2c3e50;
    margin-top: -100px;
    max-width: 600px;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
  }

  #app a {
    color: #42b983;
    text-decoration: none;
  }

  .logo {
    width: 100px;
    height: 100px
  }
</style>
