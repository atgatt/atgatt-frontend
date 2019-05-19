<template>
  <div v-if="certifications">
    <ce-certification-filter v-bind:certifications="certifications" region="shoulder" />
    <ce-certification-filter v-bind:certifications="certifications" region="elbow" />
    <ce-certification-filter v-bind:certifications="certifications" region="back" />
    <ce-certification-filter v-bind:certifications="certifications" region="chest" />
    <div class="form-group">
      <div class="form-check">
        <label class="form-check-label">
          <input class="form-check-input" v-model="certifications.fitsAirbag" type="checkbox"> Supports Airbag
        </label>
      </div>
    </div>
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
