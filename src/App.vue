<template>
  <div id="app">
    <nav-bar />
    <router-view />
    <app-footer />
    <vue-progress-bar />
  </div>
</template>

<script>
import NavBar from './components/common/layout/NavBar'
import Footer from './components/common/layout/Footer'
export default {
  name: 'app',
  components: {
    'nav-bar': NavBar,
    'app-footer': Footer
  },
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
