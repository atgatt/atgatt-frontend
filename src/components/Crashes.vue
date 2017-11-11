<template>
  <div>
      <span v-if="isLoaded">
        Loaded!
      </span>
      <span v-else>
        Loading...
      </span>
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
