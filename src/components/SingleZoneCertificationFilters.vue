<template>
  <div v-if="certifications">
    <ce-certification-filter v-bind:certifications="certifications" region="overall" />
  </div>
</template>

<script>
import CECertificationFilter from './CECertificationFilter'
export default {
  props: ['certifications'],
  components: {
    'ce-certification-filter': CECertificationFilter
  }
}
</script>

<style scoped>

</style>
