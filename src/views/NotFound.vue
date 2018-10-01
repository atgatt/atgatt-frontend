<template>
  <div class="jumbotron">
    <h1 class="display-3">Not Found</h1>
    <hr class="my-4">
    <p>The page you were looking for was not found.</p>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  mounted () {
    this.$Progress.finish()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
