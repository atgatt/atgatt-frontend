<template>
  <div class="jumbotron">
    <h1 class="display-3">Motorcycle crashes are either sad stories or epic tales.</h1>
    <p class="lead">Which would you like to star in?</p>
    <hr class="my-4">
    <p>If you're the "epic tale" kind of person, you're in the right place. We built CrashTested to be the most comprehensive, safe, and trusted source of motorcycle safety data on the internet.</p>
    <p class="lead">
      <router-link to="/ratings" class="btn btn-primary btn-lg" role="button">View Ratings</router-link>
      <router-link to="/about" class="btn btn-secondary btn-lg" role="button">About Us</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted () {
    this.$Progress.finish()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
