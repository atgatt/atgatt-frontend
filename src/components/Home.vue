<template>
  <div class="jumbotron">
    <h1 class="display-3">Unsure if your motorcycle gear is safe?</h1>
    <p class="lead">Don't fear, CrashTested is here!</p>
    <hr class="my-4">
    <p>We built CrashTested because safety standards for motorcycle gear are confusing and often meaningless. Instead of scouring the internet, looking for clues as to which standards your gear is held to, just click below to get accurate and up-to-date information about your favorite motorcycle gear!</p>
    <p class="lead">
      <router-link to="/products" class="btn btn-primary btn-lg" role="button">Learn more</router-link>
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
