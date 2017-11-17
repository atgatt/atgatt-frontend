<template>
  <div class="jumbotron">
    <h1 class="display-3">About Us</h1>
    <hr class="my-4">
    <p>CrashTested was built by a small team of Software Engineers working out of San Diego, California. 
      Click <a href="mailto:hello@crashtested.co">here</a> to contact us.</p>
  </div>
</template>

<script>
export default {
  name: 'About',
  mounted () {
    this.$Progress.finish()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
