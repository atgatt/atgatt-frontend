<template>
  <ul name="certifications-list" class="fa-ul certifications-list">
    <label class="certifications-label d-none d-lg-block" for="certifications-list">Certifications</label>
    <ce-certification-badge v-bind:certification="product.bootsCertifications.overall" regionName="Overall" />
  </ul>
</template>

<script>
import CECertificationBadge from './CECertificationBadge'

export default {
  name: 'BootsCertificationBadges',
  components: {
    'ce-certification-badge': CECertificationBadge
  },
  props: ['product']
}
</script>

<style scoped>
.certifications-label {
  font-size: larger;
}
</style>
