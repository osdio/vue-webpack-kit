<template>
  <div class="hello">
    <h1>
      count: {{count}}
    </h1>
    <a @click="add()">add</a>

  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        count: 2
      }
    },
    methods: {
      add: function () {
        this.count = this.count + 1000;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    color: #42b983;
  }
</style>
