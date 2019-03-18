<template>
  <nav class="navbar navbar-expand-lg navbar-dark app-navbar">
    <router-link class="navbar-brand" to="/"><font-awesome-icon icon="motorcycle" /> CrashTested</router-link>
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
import NavItem from './NavItem'
export default {
  name: 'nav-bar',
  components: {
    'nav-item': NavItem
  }
}
</script>

<style scoped>
.app-navbar {
  background-color: #0099ff;
}
</style>
