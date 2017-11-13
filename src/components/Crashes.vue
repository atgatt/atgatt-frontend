<template>
  <div class="row">
    <div class="col">
      sidebar
    </div>
    <div class="col">
      results
    </div>
  </div>
</template>

<script>
export default {
  name: 'Crashes',
  data () {
    return {
      crashes: [],
      isLoaded: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.isLoaded = true
      this.$Progress.finish()
    }, 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
