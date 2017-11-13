<template>
  <div id="app">
    <nav-bar />
    <router-view />
    <vue-progress-bar />
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        this.$Progress.parseMeta(meta)
      }
      this.$Progress.start()
      next()
    })
  }
}
</script>

<style>

</style>
