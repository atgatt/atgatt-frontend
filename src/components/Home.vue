<template>
  <div class="home-wrapper">
    <div class="jumbotron">
      <h1 class="display-4"><strong>Motorcycle crashes are either sad stories or epic tales.</strong></h1>
      <p class="lead">Which would you like to star in?</p>
      <p class="lead">
        <router-link to="/ratings" class="btn btn-primary btn-lg" role="button">View Ratings</router-link>
        <router-link to="/about" class="btn btn-secondary btn-lg" role="button">About Us</router-link>
      </p>
      <hr class="my-4">
      <p class="lead">
        If you're the "epic tale" kind of person, you're in the right place. We built CrashTested to be the most comprehensive and trusted source of motorcycle safety data on the internet.
        <br/><br/>
        By the way, we've got big things planned. Sign up to be the first to know about our latest features:
      </p>
      <email-signup />
    </div>

    <img class="hero-image" src="/static/moto-track.jpg" />
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
  .jumbotron {
    margin-bottom: 0;
  }

  .hero-image {
    width: 100%;
    height: 100%;
  }
</style>
