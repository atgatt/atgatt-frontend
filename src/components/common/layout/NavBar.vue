<template>
  <nav class="navbar navbar-expand-lg navbar-dark app-navbar">
    <router-link class="navbar-brand" to="/"><i class="fa fa-motorcycle"/> CrashTested</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
          <nav-item route="/" text="Ratings" exact="true" />
          <nav-item route="/about" text="About" />
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'nav-bar'
}
</script>

<style scoped>
.app-navbar {
  background-color: #0099ff;
}
</style>
