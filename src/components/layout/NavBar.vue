<template>
  <nav class="navbar-padding-hack navbar navbar-expand-lg navbar-dark" style="background-color: #2868D3">
    <router-link class="navbar-brand" to="/"><i class="fa fa-motorcycle"/> CrashTested</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <form class="form-inline">
      <input class="form-control search-box" type="text" placeholder="Search"></input>
    </form>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
          <nav-item route="/products" text="Products" />
          <nav-item route="/crashes" text="Crashes" />
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
.navbar-padding-hack {
  padding: 0.2rem 1rem
}

.search-box {
  width: 25rem
}
</style>
