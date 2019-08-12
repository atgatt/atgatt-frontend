<template>
  <ul name="certifications-list" class="fa-ul certifications-list">
    <label class="certifications-label d-none d-lg-block" for="certifications-list">Certifications</label>
    <ce-certification-badge v-bind:certification="product.pantsCertifications.knee" regionName="Knee" />
    <ce-certification-badge v-bind:certification="product.pantsCertifications.hip" regionName="Hip" />
    <ce-certification-badge v-bind:certification="product.pantsCertifications.tailbone" regionName="Tailbone" />
  </ul>
</template>

<script>
import CECertificationBadge from './CECertificationBadge'

export default {
  name: 'PantsCertificationBadges',
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
