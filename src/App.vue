<template>
  <div id="app">
    <nav-bar />
    <router-view />
    <app-footer />
    <vue-progress-bar />
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    this.$Progress.start()
    this.$router.beforeEach((to, from, next) => {
      document.title = `CrashTested - ${to.name}`
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

<!-- global styles for the entire app -->
<style>
i.fa-info-circle {
  color: skyblue;
  cursor: pointer;
}
</style>
